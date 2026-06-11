const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

async function main() {
  try {
    const dataBuffer = fs.readFileSync(path.join(__dirname, '../master-assets/SquadLists-English.pdf'));
    const parse = typeof pdf === 'function' ? pdf : pdf.default || pdf.pdf;
    
    if (typeof parse !== 'function') {
      console.log('Keys in pdf module:', Object.keys(pdf));
      return;
    }

    const data = await parse(dataBuffer);
    const text = data.text;
    
    // Process text
    // The text has lines like: "Algeria (ALG)"
    // And players like: "GK MASTIL Melvin Melvin Feycal MASTIL MASTIL 19/02/2000 FC Stade Nyonnais (SUI) 194"
    // Or "1 GK MASTIL ..."
    // Coach: "Head coach PETKOVIC Vladimir Vladimir PETKOVIĆ Switzerland"
    
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    const teamsData = {};
    let currentTeam = null;
    let players = [];
    let coach = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Look for Team Name "Country (CODE)"
      const teamMatch = line.match(/^([a-zA-Z\s]+?)\s+\(([A-Z]{3})\)$/);
      if (teamMatch) {
        if (currentTeam) {
          teamsData[currentTeam] = { players, coach };
        }
        currentTeam = teamMatch[1].trim();
        players = [];
        coach = "Unknown";
        continue;
      }
      
      // Look for Coach
      const coachMatch = line.match(/^Head coach\s+(.+)$/);
      if (coachMatch && currentTeam) {
        // e.g. "PETKOVIC Vladimir Vladimir PETKOVIĆ Switzerland"
        // we'll just grab the whole string or split it. Usually it's LAST FIRST FIRST LAST NATIONALITY
        // Let's just grab the first two words as a rough approximation
        const parts = coachMatch[1].split(' ');
        if (parts.length >= 2) {
          coach = parts[1] + ' ' + parts[0]; // First Last
        } else {
          coach = coachMatch[1];
        }
        continue;
      }
      
      // Look for Players
      // "GK MASTIL Melvin Melvin Feycal MASTIL MASTIL 19/02/2000 FC Stade Nyonnais (SUI) 194"
      const playerMatch = line.match(/^(GK|DF|MF|FW)\s+(.+?)\s+(\d{2}\/\d{2}\/\d{4})\s+(.+?)\s+(\d{3})$/);
      if (playerMatch && currentTeam) {
        const pos = playerMatch[1];
        const height = playerMatch[5];
        
        // This regex is hard to get right because names have spaces.
        // Let's try simpler: Split by double spaces or just use the OCR text from the conversation.
      }
      
      // Simpler player parsing based on standard format:
      // "GK MASTIL Melvin Melvin Feycal MASTIL MASTIL 19/02/2000 FC Stade Nyonnais (SUI) 194"
      // Wait, there are usually dates in xx/xx/xxxx format
      const dateMatch = line.match(/(\d{2}\/\d{2}\/\d{4})/);
      if (dateMatch && currentTeam) {
        // Find position
        let posMatch = line.match(/^(?:(?:[1-9]|[12]\d)\s+)?(GK|DF|MF|FW)\s+/);
        if (posMatch) {
           const pos = posMatch[1];
           // Extract name (everything between POS and Date)
           const idx = line.indexOf(posMatch[0]) + posMatch[0].length;
           const dateIdx = line.indexOf(dateMatch[1]);
           let nameStr = line.substring(idx, dateIdx).trim();
           // Name string is like "MASTIL Melvin Melvin Feycal MASTIL MASTIL"
           // We can just grab the first two words "MASTIL Melvin" -> "Melvin MASTIL"
           let nameParts = nameStr.split(' ');
           let displayName = nameParts.length >= 2 ? nameParts[1] + ' ' + nameParts[0] : nameStr;
           
           // Club is after date
           let remainder = line.substring(dateIdx + 10).trim();
           let clubMatch = remainder.match(/(.+?)\s+\(\w+\)\s+(\d{3})$/);
           let club = "Unknown Club";
           let isStar = false;
           if (clubMatch) {
             club = clubMatch[1].trim();
           } else {
             // Fallback
             club = remainder.replace(/\d{3}$/, '').trim();
           }
           
           // Star player if they play for big clubs randomly or based on index
           players.push({
             id: currentTeam.substring(0,3).toLowerCase() + '-' + players.length,
             name: displayName,
             number: players.length + 1,
             position: pos,
             club: club,
             isStar: (pos === 'FW' && players.length % 5 === 0)
           });
        }
      }
    }
    
    if (currentTeam) {
      teamsData[currentTeam] = { players, coach };
    }
    
    // Read football.teams.json to map IDs
    const teamsJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/football.teams.json'), 'utf8'));
    const finalData = {};
    
    for (const team of teamsJson) {
      let teamName = team.name_en;
      // Handle naming differences like "USA" vs "United States", "IR Iran" vs "Iran", "Korea Republic" vs "South Korea"
      let parsedTeam = teamsData[teamName];
      if (!parsedTeam) {
        // try to find partial match
        const key = Object.keys(teamsData).find(k => k.includes(teamName) || teamName.includes(k));
        if (key) {
           parsedTeam = teamsData[key];
        } else {
           console.log("Missing data for:", teamName);
           // Generate fake
           parsedTeam = { players: [], coach: 'Unknown' };
        }
      }
      finalData[team.id] = parsedTeam;
    }
    
    fs.writeFileSync(path.join(__dirname, '../public/data/squads.json'), JSON.stringify(finalData, null, 2));
    console.log("Successfully wrote squads.json");
    
  } catch (e) {
    console.error(e);
  }
}

main();
