// browser javascript, using browserify imports for prismarine-nbt

const { Buffer } = require('buffer');
const prismarineNbt = require('prismarine-nbt');

// we are importing java edition schematics, but we need bedrock edition blocks, so we have a map of java blocks to bedrock blocks
// thank you so much github copilot for making this easy to do
const javaToBedrock = {
    'minecraft:white_concrete': 'concrete 0', // white concrete
    'minecraft:orange_concrete': 'concrete 1', // orange concrete
    'minecraft:magenta_concrete': 'concrete 2', // magenta concrete
    'minecraft:light_blue_concrete': 'concrete 3', // light blue concrete
    'minecraft:yellow_concrete': 'concrete 4', // yellow concrete
    'minecraft:lime_concrete': 'concrete 5', // lime concrete
    'minecraft:pink_concrete': 'concrete 6', // pink concrete
    'minecraft:gray_concrete': 'concrete 7', // gray concrete
    'minecraft:light_gray_concrete': 'concrete 8', // light gray concrete
    'minecraft:cyan_concrete': 'concrete 9', // cyan concrete
    'minecraft:purple_concrete': 'concrete 10', // purple concrete
    'minecraft:blue_concrete': 'concrete 11', // blue concrete
    'minecraft:brown_concrete': 'concrete 12', // brown concrete
    'minecraft:green_concrete': 'concrete 13', // green concrete
    'minecraft:red_concrete': 'concrete 14', // red concrete
    'minecraft:black_concrete': 'concrete 15', // black concrete
    // wool colors
    'minecraft:white_wool': 'wool 0', // white wool
    'minecraft:orange_wool': 'wool 1', // orange wool
    'minecraft:magenta_wool': 'wool 2', // magenta wool
    'minecraft:light_blue_wool': 'wool 3', // light blue wool
    'minecraft:yellow_wool': 'wool 4', // yellow wool
    'minecraft:lime_wool': 'wool 5', // lime wool
    'minecraft:pink_wool': 'wool 6', // pink wool
    'minecraft:gray_wool': 'wool 7', // gray wool
    'minecraft:light_gray_wool': 'wool 8', // light gray wool
    'minecraft:cyan_wool': 'wool 9', // cyan wool
    'minecraft:purple_wool': 'wool 10', // purple wool
    'minecraft:blue_wool': 'wool 11', // blue wool
    'minecraft:brown_wool': 'wool 12', // brown wool
    'minecraft:green_wool': 'wool 13', // green wool
    'minecraft:red_wool': 'wool 14', // red wool
    'minecraft:black_wool': 'wool 15', // black wool
    // terracotta colors
    'minecraft:white_terracotta': 'stained_hardened_clay 0', // white terracotta
    'minecraft:orange_terracotta': 'stained_hardened_clay 1', // orange terracotta
    'minecraft:magenta_terracotta': 'stained_hardened_clay 2', // magenta terracotta
    'minecraft:light_blue_terracotta': 'stained_hardened_clay 3', // light blue terracotta
    'minecraft:yellow_terracotta': 'stained_hardened_clay 4', // yellow terracotta
    'minecraft:lime_terracotta': 'stained_hardened_clay 5', // lime terracotta
    'minecraft:pink_terracotta': 'stained_hardened_clay 6', // pink terracotta
    'minecraft:gray_terracotta': 'stained_hardened_clay 7', // gray terracotta
    'minecraft:light_gray_terracotta': 'stained_hardened_clay 8', // light gray terracotta
    'minecraft:cyan_terracotta': 'stained_hardened_clay 9', // cyan terracotta
    'minecraft:purple_terracotta': 'stained_hardened_clay 10', // purple terracotta
    'minecraft:blue_terracotta': 'stained_hardened_clay 11', // blue terracotta
    'minecraft:brown_terracotta': 'stained_hardened_clay 12', // brown terracotta
    'minecraft:green_terracotta': 'stained_hardened_clay 13', // green terracotta
    'minecraft:red_terracotta': 'stained_hardened_clay 14', // red terracotta
    'minecraft:black_terracotta': 'stained_hardened_clay 15', // black terracotta
    // logs
    'minecraft:oak_log': 'log 0', // oak logs
    'minecraft:spruce_log': 'log 1', // spruce logs
    'minecraft:birch_log': 'log 2', // birch logs
    'minecraft:jungle_log': 'log 3', // jungle logs
    'minecraft:acacia_log': 'log2', // acacia logs, for some very strange reason this is called log2, bedrock edition is weird
    'minecraft:dark_oak_log': 'log2 1', // dark oak logs, bedrock weird
    // leaves
    'minecraft:oak_leaves': 'leaves 0', // oak leaves
    'minecraft:spruce_leaves': 'leaves 1', // spruce leaves
    'minecraft:birch_leaves': 'leaves 2', // birch leaves
    'minecraft:jungle_leaves': 'leaves 3', // jungle leaves
    'minecraft:acacia_leaves': 'leaves2', // acacia leaves, leaves2??
    'minecraft:dark_oak_leaves': 'leaves2 1', // dark oak leaves, leaves2??
    // planks
    'minecraft:oak_planks': 'planks 0', // oak planks
    'minecraft:spruce_planks': 'planks 1', // spruce planks
    'minecraft:birch_planks': 'planks 2', // birch planks
    'minecraft:jungle_planks': 'planks 3', // jungle planks
    'minecraft:acacia_planks': 'planks 4', // acacia planks
    'minecraft:dark_oak_planks': 'planks 5', // dark oak planks
    // carpet
    'minecraft:white_carpet': 'carpet 0', // white carpet
    'minecraft:orange_carpet': 'carpet 1', // orange carpet
    'minecraft:magenta_carpet': 'carpet 2', // magenta carpet
    'minecraft:light_blue_carpet': 'carpet 3', // light blue carpet
    'minecraft:yellow_carpet': 'carpet 4', // yellow carpet
    'minecraft:lime_carpet': 'carpet 5', // lime carpet
    'minecraft:pink_carpet': 'carpet 6', // pink carpet
    'minecraft:gray_carpet': 'carpet 7', // gray carpet
    'minecraft:light_gray_carpet': 'carpet 8', // light gray carpet
    'minecraft:cyan_carpet': 'carpet 9', // cyan carpet
    'minecraft:purple_carpet': 'carpet 10', // purple carpet
    'minecraft:blue_carpet': 'carpet 11', // blue carpet
    'minecraft:brown_carpet': 'carpet 12', // brown carpet
    'minecraft:green_carpet': 'carpet 13', // green carpet
    'minecraft:red_carpet': 'carpet 14', // red carpet
    'minecraft:black_carpet': 'carpet 15', // black carpet
    

    // other stuffs
    'minecraft:glow_lichen': 'glow_lichen 1', // put it on the floor
    'minecraft:cobweb': 'web', // cobweb
    'minecraft:grass_block': 'grass' // grass block

}

function getBedrockBlock(block){
    return javaToBedrock[block] || block; // if it's not in the list, return the block as is
}

function distance(block1, block2){ // distance between two blocks, in blocks
    var x1 = block1[0];
    var y1 = block1[1];
    var z1 = block1[2];
    var x2 = block2[0];
    var y2 = block2[1];
    var z2 = block2[2];
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
} // will return a decimal if theres any diagonal distance, but that's fine

async function convert(file){
    const textArea = document.getElementById('output');
    textArea.value = '';
    const status = document.getElementById('status');

    status.innerText = 'Converting...';

    // analytics event
    amplitude.getInstance().logEvent('NBT_GENERATED');

    const buffer = await file.arrayBuffer();
    const nbt = await prismarineNbt.parse(Buffer.from(buffer));
    const schem = nbt.parsed.value;

    // console.log(schem); // debug log - TODO: remove

    // Convert all blocks in the schematic to setblock and fill commands
    
    // Simple fill clumping algorithm
    // if the block is the same as the previous block, and the previous block is 1 block away, append the block to clump
    // if the block is not the same or is more than 1 block away, create a new clump, and append a fill command
    // if the clump is too big, create a new clump, and append a fill command
    // if the previous block is not the same and the clump is 1 block long, create a new clump, and append a setblock command

    let clumps = [];
    let clump = [];
    let maxClumpSize = 32767;

    schem.blocks.value.value.forEach( (block, index) => {
        /*
        type Block = {
            pos: {
                type: 'int',
                value: [number, number, number]
            },
            state: {
                type: 'int',
                value: number // this number is an index into of the schem.palette.value.value array
            }
        }
        */
        const blockState = schem.palette.value.value[block.state.value].Name.value;
        // value value value blah blah blah
        const bedrockBlock = getBedrockBlock(blockState);
        const blockJSON = {
            pos: [block.pos.value.value[0], block.pos.value.value[1], block.pos.value.value[2]],
            block: bedrockBlock
        }
        if(clump.length > 0){
            if(clump.length > maxClumpSize){
                clumps.push(clump);
                clump = [];
            } else
            if(distance(clump[clump.length - 1].pos, blockJSON.pos) > 1){
                clumps.push(clump);
                clump = [];
            } else
            if(clump[clump.length - 1].block !== bedrockBlock){
                clumps.push(clump);
                clump = [];
            }
        }
        clump.push(blockJSON);
    });
    clumps.push(clump);

    let commands = [];

    // convert clumps to commands
    clumps.forEach( (clump) => {
        let command = '';
        if(clump.length > 1){
            command = 'fill ';
            
            let first = clump[0];
            let last = clump[clump.length - 1];

            command += '~' + first.pos[0] + ' ~' + first.pos[1] + ' ~' + first.pos[2] + ' ';
            command += '~' + last.pos[0] + ' ~' + last.pos[1] + ' ~' + last.pos[2] + ' ';
            command += first.block

            commands.push(command);
        }
        if(clump.length === 1){
            command = 'setblock ';
            command += '~' + clump[0].pos[0] + ' ~' + clump[0].pos[1] + ' ~' + clump[0].pos[2] + ' ';
            command += clump[0].block;
            commands.push(command);
        }
    })
    // save a little memory by removing the clumps array
    clumps = null;

    // convert commands to npc lines
    let lines = [];
    commands.forEach( (command) => {
        lines.push({
            "cmd_line": command,
            "cmd_ver": 24 // this line required for the button to show up, its annoying but its required
        })
    })
    // save a little memory by removing the commands array
    commands = null;

    let chunks = [];
    
    // seperate into chunks of 400 lines
    // we can cram about 400 commands into a single npc before we get size errors
    for(let i = 0; i < lines.length; i += 400){
        chunks.push(lines.slice(i, i + 400));
    }

    let buttons = [];
    let buttonTemplate = {
        "button_name": "",
        "data": [
            /* command lines here */
        ],
        "mode": 0, // 0 = button, 1, 1 = on enter, 2 = on exit
        "text": "", // what shows in the command editor, oddly different from the command lines
        "type": 1
    }

    // convert chunks to npc buttons
    for(var i = 0; i < chunks.length; i++){
        let button = JSON.parse(JSON.stringify(buttonTemplate));
        button.button_name = `Â§eÂ§lBuild`;
        button.text = "hehehe no peeky (<3 mmccall0813#0943)";
        button.data = chunks[i];
        buttons.push(button);
    }

    // make npcs and have one button for each
    let npcs = [];

    for(let i = 0; i < buttons.length; i++){
        // add kill command to the end of this button
        buttons[i].data.push({
            "cmd_line": "dialogue open @e[type=npc,name=SPLITHERE\"npc"+(i+2)+"SPLITHERE\"] @p",
            "cmd_ver": 24
        },
        {
            "cmd_line": "kill @s",
            "cmd_ver": 24
        })

        npcs.push(
            `{ActorIdentifier:"npc",SaveData:{InterativeText:"Â§lÂ§8Made with Â§c<3Â§8 by Â§rÂ§2mmccall0813#0943. Â§lÂ§6(${i+1}/${buttons.length})",Actions:"[`
            + JSON.stringify(buttons[i]) +
            `]",CustomName:"npc${i+1}",RawtextName:"npc${i+1}",Variant:19,identifier:"npc",Pos:[]}}`
        )
    }
    // puts every npc into one movingblock
    let block = [];
    block.push(
        `{Count:1b,Name:"moving_block",tag:{display:{Lore:["Â§rÂ§ePlace in the Â§lNorthwestÂ§rÂ§e corner of the build.","Â§eMade with Â§b<3Â§rÂ§e by mmccall0813","Â§rÂ§lÂ§cImported from ${file.name}"],Name:"Â§eÂ§l(${i+1}/${buttons.length})Â§rÂ§rMapart NPC Spawner"},ench:[{id:28s,lvl:1s}],movingBlock:{name:"minecraft:bee_nest"},movingEntity:{Occupants:[`
        + npcs.join(",") +
    `],id:"Beehive"}}}`
    );

    // puts everything into the textarea
    textArea.value = block[0];

    status.innerText = "Done!";

    // TODO: figure out what the fuck this line does lol
    textArea.value = textArea.value.split("\\").join("").split("SPLITHERE").join("\\\\\\").split("npc"+(buttons.length+1)+"\\").join("npc1\\");

    setTimeout(() => {
        status.innerText = "IDLE";
    }, 5000);
}

function download(){
    const textArea = document.getElementById("output");
    let text = textArea.value;
    let file = new Blob([text], {type: "text/plain;charset=utf-8"});
    let fileInput = document.getElementById("file");
    let filename = fileInput.files[0].name.replace(/\.[^/.]+$/, "") + ".txt";

    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function copy(button){
    const textArea = document.getElementById("output");
    let text = textArea.value;
    
    navigator.clipboard.writeText(text).then(
        () => {
            // clipboard copy success
            console.log("clipboard copy")

            button.innerText = "Copied!"

            setTimeout( () => {
                button.innerText = "Copy"
            }, 1000)
        }, 
        () => {
            // clipboard copy failed
            console.log("copy failed")

            button.innerText = "Copy Failed"

            setTimeout( () => {
                button.innerText = "Copy"
            })

        }
    )

}