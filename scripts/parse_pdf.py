import pdfplumber
import json
import os

pdf_path = r"C:\Users\Salif\OneDrive\Desktop\projects\WC 2026\master-assets\SquadLists-English.pdf"
teams_json_path = r"C:\Users\Salif\OneDrive\Desktop\projects\WC 2026\public\data\football.teams.json"
output_path = r"C:\Users\Salif\OneDrive\Desktop\projects\WC 2026\public\data\squads.json"

def main():
    try:
        with open(teams_json_path, 'r', encoding='utf-8') as f:
            teams = json.load(f)
    except Exception as e:
        print("Error loading teams json:", e)
        return

    squads = {}
    
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue
                
            lines = text.split('\n')
            team_name_str = None
            for line in lines:
                if '(' in line and ')' in line:
                    if len(line.split('(')[1]) == 4: # e.g. "(ALG)"
                        team_name_str = line.strip()
                        break
            
            if not team_name_str:
                continue
            
            team_name = team_name_str.split('(')[0].strip()
                
            # Extract Coach
            coach = "Unknown"
            for line in reversed(lines):
                if line.startswith("Head coach"):
                    parts = line.split()
                    if len(parts) >= 4:
                        coach = parts[3] + " " + parts[2]
                    else:
                        coach = line.replace("Head coach", "").strip()
                    break

            tables = page.extract_tables()
            players = []
            
            if tables:
                # The first table is usually the main players table
                table = tables[0]
                # Skip header row
                for row in table[1:]:
                    if not row or not row[0]: continue
                    if len(row) < 8: continue
                    # POS = 1, PLAYER_NAME = 2, FIRST = 3, LAST = 4, SHIRT = 5, DOB = 6, CLUB = 7, HEIGHT = 8
                    # actually headers are: #, POS, PLAYER NAME, FIRST, LAST, SHIRT, DOB, CLUB, HEIGHT
                    
                    pos = row[1]
                    if not pos in ['GK', 'DF', 'MF', 'FW']:
                        continue
                    
                    first = row[3]
                    last = row[4]
                    if first and last:
                        name = f"{first} {last}".replace('\n', ' ').strip()
                    else:
                        name = row[2].replace('\n', ' ') if row[2] else "Unknown"
                        
                    club = row[7].replace('\n', ' ') if row[7] else "Unknown"
                    num = row[0]
                    
                    players.append({
                        "id": f"{team_name[:3].lower()}-{num}",
                        "name": name,
                        "number": int(num) if num.isdigit() else 0,
                        "position": pos,
                        "club": club,
                        "isStar": False
                    })
            
            # Map team_name to ID
            # Fixes for names
            match_id = None
            for t in teams:
                t_en = t['name_en']
                if t_en.lower() == team_name.lower() or t_en.lower() in team_name.lower() or team_name.lower() in t_en.lower():
                    match_id = t['id']
                    break
            
            if not match_id:
                # Manual fixes
                if "IR Iran" in team_name: match_id = "22"
                elif "Korea Republic" in team_name: match_id = "23"
                elif "Cabo Verde" in team_name: match_id = "9" # Check later
                elif "Congo DR" in team_name: match_id = "11"
                elif "Cte" in team_name or "Côte" in team_name or "Ivoire" in team_name: match_id = "10"
                elif "Czechia" in team_name: match_id = "28"
                elif "rkiye" in team_name or "Türkiye" in team_name: match_id = "30"
                elif "USA" in team_name: match_id = "47"
                
                # Double check ID manually with JSON just in case they fail.
                for t in teams:
                    if "Cape Verde" in t['name_en'] and "Cabo Verde" in team_name: match_id = t['id']
                    if "Congo" in t['name_en'] and "Democratic" in t['name_en'] and "Congo DR" in team_name: match_id = t['id']
                    if "Ivory Coast" in t['name_en'] and "Ivoire" in team_name: match_id = t['id']
                    if "Czech Republic" in t['name_en'] and "Czechia" in team_name: match_id = t['id']
                    if "Turkey" in t['name_en'] and "rkiye" in team_name: match_id = t['id']
                    if "United States" in t['name_en'] and "USA" in team_name: match_id = t['id']
                
            if match_id:
                # Just add some random stars to FWs
                for i, p in enumerate(players):
                    if p['position'] == 'FW' and i % 3 == 0:
                        p['isStar'] = True
                        
                squads[match_id] = {
                    "coach": coach,
                    "players": players
                }
            else:
                print(f"Could not match team {team_name}")
                
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(squads, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully processed {len(squads)} teams.")

if __name__ == "__main__":
    main()
