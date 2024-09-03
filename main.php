    <!DOCTYPE html>
    <html lang="en">
    <head>
        <style>
            * {
                font-family: 'Press Start 2P', cursive; 
            }
            body {
                background-color: black;
            }

            h1 {
                margin: 0;
            }

            button {
                border: 0;
                cursor: pointer;
                font-size: 16px;
            }

            button:hover {
                background-color:#ddd;
            }
        </style>
        <meta charset="UTF-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    </head>
    <body>
        <div style="display: inline-block; position: relative;">
        <div id="battleTransition" style="background-color: black; position: absolute; top: 0; right: 0; left: 0; bottom: 0; opacity: 0; pointer-events: none; z-index: 10;"></div>
        <canvas id="canvas" height="750" width="1000"></canvas>

            <div id="battleScreenUI" style="display: none">
                    <!--Enemy health bar-->
                    <div 
                            style="
                                background-color: white;
                                width: 250px;
                                position: absolute;
                                top: 50px;
                                left: 50px;
                                border: 4px black solid;
                                padding: 12px;
                            "
                        >
                            <h1 id="opponentPokemonName" style="font-size: 16px; ">Bulbasaur</h1>
                            <div style="position: relative;">
                                <div id="opponentHealthBar" style="height: 10px; background-color: #2cd13a; position: absolute; top: 0; left: 0; right: 0;"></div>
                                <div style="height: 10px; background-color: #ccc; margin-top: 10px;"></div>
                                
                            </div>
                            
                    </div>
                    <!--Player health bar-->
                    <div 
                            style="
                                background-color: white;
                                width: 250px;
                                position: absolute;
                                top: 400px;
                                right: 50px;
                                border: 4px black solid;
                                padding: 12px;
                            "
                        >
                            <h1 id="playerPokemonName" style="font-size: 16px; ">Charmander</h1>
                            <div style="position: relative;">
                                <div id="playerHealthBar" style="height: 10px; background-color: #2cd13a; position: absolute; top: 0; left: 0; right: 0;"></div>
                                <div style="height: 10px; background-color: #ccc; margin-top: 10px;"></div>
                                
                            </div>
                            
                    </div>
                        
                     <!--Pokemon selection screen-->
                        <div  id="choosePokemon"  style="
                                background-color: white;
                                width: 550px;
                                position: absolute;
                                top: 100px;
                                left: 200px;
                                bottom: 300px;
                                border: 4px black solid;
                                padding: 12px;
                                z-index: 5;
                                display: none
                            ">
                            <h1 style="font-size: 16px; margin-top: 10px; margin-left: 35px ; margin-bottom: 10px">Choose a Pokemon</h1>
                            <div 
                                id="pokemonButtons"
                                style="
                                display: grid; 
                                grid-template-columns: repeat(2, 1fr); 
                                background-color: white;
                                padding: 12px;
                                cursor: pointer;"
                                >
                            </div>
                            <button 
                                style="
                                background-color: white;
                                padding: 12px;
                                cursor: pointer;" id="back" >Back</button>
                        </div>
                        <div 
                            id="menuContainer" 
                            style="
                            background-color: white; 
                            border: 4px black solid;
                            height: 200px;
                            position: absolute; 
                            right: 0; 
                            left: 0; 
                            bottom: 0;
                            display: flex;"
                        >
                            <div
                            id="textBox" 
                            style="
                            position: absolute; 
                            top: 0; 
                            right: 0; 
                            left: 0; 
                            bottom: 0; 
                            background-color: white;
                            padding: 12px;
                            display: none;
                            cursor: pointer;"
                            >Choose a Pokemon</div>
                            
                            <div id="attackButtons" style="width: 66.66%; display: grid; grid-template-columns: repeat(2, 1fr);">
                            
                            </div>  
                            <div id="switchMenu" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 33.33%;border-left: 4px black solid;">
                                <h1 id="attackType" style="font-size: 16px; margin-bottom: 25px;">Attack Type</h1>
                                <button id="pokemonSwitch" style="margin-top: 25px; border: 2px; border-style: dashed; padding: 10px; background-color: lightblue">Switch Pokémon</button> 
                            </div>  
                        </div>
                    </div>
            </div>
            
        <!--Librries imported from cdnjs.com-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js" integrity="sha512-xi/RZRIF/S0hJ+yJJYuZ5yk6/8pCiRlEXZzoguSMl+vk2i3m6UjUO/WcZ11blRL/O+rnj94JRGwt/CHbc9+6EA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js" integrity="sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="Data/classes.js"></script>
        <script src="Assets/Music_and_SFX/Music_and_SFX.js"></script>
        <script src="Data/attacks.js"></script>
        <script src="Data/monsters.js"></script>
        <script src="monsters.php"></script>
        <script src="Collisions/collision_map.js"></script>
        <script src="Collisions/battle_zone.js"></script>
        <script src="main.js"></script>
        <script src="Data/battle.js"></script>
        <?php
        function debug_to_console($data) {
            $output = $data;
            if (is_array($output))
                $output = implode(',', $output);
        
            echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
        }
        
        try {
            // Database connection setup
            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "project3";
            $dsn = "mysql:host=$servername;";
        
            // Establish the database connection
            $connection = new PDO($dsn, $username, $password);
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, 1);
        
            // Read the SQL queries from the file
            $sqlFile = 'data/pokedex.sql';
            $query = file_get_contents($sqlFile);
        
            // Prepare and execute the statement
            $statement = $connection->prepare($query);
            $statement->execute();
        
            // Fetch the results
            $data = [];
            do {
                $data[] = $statement->fetchAll(PDO::FETCH_ASSOC);
            } while ($statement->nextRowset());
        
            // Display the results for debugging
            print_r($data);
            debug_to_console($data);
        
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            debug_to_console($e->getMessage());
        }
        
        // Close the connection
        $connection = null;
        ?>
    </body>
    </html>