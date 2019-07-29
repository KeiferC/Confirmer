// https://developers.google.com/apps-script/reference/properties/properties
//
// TODO: If error, send email to self containing error message
//       - No recipients
//       - Cannot retrieve date of next clinic
// TODO: Abstract program to not use clinic-specific language (schedule confirmer?)
// TODO: Documentation
// TODO: Change icon CDN host: https://postimages.org/
// TODO: Expand to create multiple confirmer cards based on needs?
// TODO: Add direct links to edit sheets?

/*
 * TODO: Module Documentation
 */

//////////////////////////////////////////
// Main                                 //
//////////////////////////////////////////
var PRIMARY_COLOR = "#1c8adb";
var SECONDARY_COLOR = "#1c8adb";


function main()
{
        var manager, settings;
        manager = new SettingsManager();
        settings = manager.getAll();

        //debug - reset
        if (JSON.stringify(settings) != "{}") {
                manager.getGASO().deleteAllProperties();

                //debug
                Logger.log("here1");

                settings = manager.getAll();

                //debug
                Logger.log("here2");
        }

        if (JSON.stringify(settings) == "{}") {
                //debug
                Logger.log("here3");

                manager.setDefault();

                //debug
                Logger.log("here4");
        }
        
        // debug
        Logger.log("gaso: ");
        Logger.log(settings);
        Logger.log(typeof(manager.getMain()));
        Logger.log(manager.getMain());
        Logger.log(manager.getContacts());
        Logger.log(manager.getSchedule());
        Logger.log(manager.getEmailContent());

        return buildDeck();
}

//////////////////////////////////////////
// Deck Builder                         //
//////////////////////////////////////////
function buildDeck()
{
        var cardDeck = [];

        //cardDeck.push(buildStatusCard());
        cardDeck.push(new SettingsCard().gCard);
        
        return cardDeck;
}
