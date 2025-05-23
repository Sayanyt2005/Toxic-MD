const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUNWVUxHZlQ0clR1ZVIrOFA1a0lCV29iVkcvYlpMa043WmFnZEZqNkZVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRlR5TEpZUzJWc0NFZmVzdkZTMkZhQVBYRWlQeUVBOGczZHVtdGZBOFRUdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnS0lybEFzSVJ6NFhDRmVnN0l3YXNqenRpYkZjRzRWNGo1U1JXSDMwNDJVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4enNoeHM5Tyt1a29oTzNTQkRwUkJNMWdHaFFqeStteGdXV2FWblFMZUg0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlHNTVXS0xTY1RBa0lkMk9zUlZiRERxSW1VT2xyeHNhdlBjU0JrVlBVbEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhwRyt5WGJuZ1pnVHdJY3FOeTdyVjFZUm02SkNSNjRFdzBoRzJPaSt1VVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOENMQkNaN0o0Z01XRzJwNmNwYWtTOEt5cmc3SkxCcjNpdjFoRnF3RDcxVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibE1WNE9BMmRpOVdhY1ZhcytjVmIrTVAvUVpKekJFTmpWZVhRanl4VjNVcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkE0NDRORkdUd2JxeEJFdnY4cG9NeHJEQ2cySUFETjdYU3FUTlZTZXhkQnZ5ZGZwUXZMblp2azBLRmN6NUJsQ0x4LzZGRkpOL3NSSVNBUUV4c1c2NUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ2LCJhZHZTZWNyZXRLZXkiOiJxZlZWS3phVlhjMUtmZk1RR2ptclJ5ZXpRZ2cvTjdJQ25VdWs1bEZEeDVnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ5ejRMRjljS1FQNmI0Mk51a0M4Mmp3IiwicGhvbmVJZCI6ImEwOWYyMzMzLTIwZDItNDMyNi1hMjFlLWNjNTBmMDJmMTI4ZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMOEhLcXhHTFEvd0szRHBLeG1OUjRiUXhFOXc9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBVV1BTbEJFNXIvM2daVWlyNlkxMHZtR1N6MD0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ04rZWk3RUNFS3I3d01FR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImVKS2dQTUp2UG5LUVk3YnM2WVZhYWltMlZBc1lWRDdwaGMxWXNPZlBkd0k9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImUrZ3JLekhsZW5zdVYrT0pNOEJiNDQwYjJ3YmhNSWpVZ1RSZk1FMEg0U25kRVFiTm1JaUdQcTlJWEZxYkRQYzArMlpnYmhJOFdYNndqNGFxL25xYkNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpcmlzN2NtbllUUWQ1SFZ0eUl2ZzNReVBRQTJUV2JQQVdabURuSE1OVFo1QTNDdzZsOFFwOE1WUlVvVzByb0g5b1ZkMlJBZDduQ1QwZ3NBY2lKRmpCZz09In0sIm1lIjp7ImlkIjoiOTE5NDc1NzI5NTY2OjQ4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMzkyMDg4MDY3ODEwMDU6NDhAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxOTQ3NTcyOTU2Njo0OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYaVNvRHpDYno1eWtHTzI3T21GV21vcHRsUUxHRlErNllYTldMRG56M2NDIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDc5OTE5OTEsImxhc3RQcm9wSGFzaCI6IjNmWXdDSyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "xh_clinton",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254735342808",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
