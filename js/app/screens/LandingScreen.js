function LandingScreen()
{
    var thisScreen = this;
    var muteBtn;

    this.name = "landingScreen";
    this.manager = null;
    this.parent = null;

    this.handleAdded = function()
    {
        var bg = displayFactory.getElementByRef("loading_screen").object;
        bg.id = "start_screen";
        document.getElementById('bgHolder').appendChild(bg);

        gameContainer.appendChild(this.parent);

        if (IS_MOBILE_DEVICE) this.parent.appendChild(displayFactory.getElementByRef("exitButton").object);
        muteBtn = this.parent.appendChild(displayFactory.getElementByRef("muteButton").object);
        sndManager.initMuteButton(muteBtn);

        this.parent.appendChild(displayFactory.getElementByRef("game_logo").object);
        this.parent.appendChild(displayFactory.getElementByRef("playButton").object);
        //this.parent.appendChild(displayFactory.getElementByRef("howToPlayButton").object);

        sndManager.stopAllSounds();
    };

    this.handleRemoved =  function()
    {
        if (IS_MOBILE_DEVICE) this.removeDiv("exitButton");

        this.removeDiv("game_logo");
        this.removeDiv("muteButton");
        this.removeDiv("playButton");
        //this.removeDiv("howToPlayButton");
        this.removeDiv("start_screen");

        displayFactory.finishWithAllElementsInUse();
    };

    this.gotoScreen = function(screen)
    {
        this.manager.goto(screen, {}, null)
    };

    this.onUserInput = function(name, type)
    {
        if(type == "touchstart" || type == "mousedown") return;

        switch(name)
        {
            case "backButton":
            case "exitButton":

                sndManager.playSound("buttonClick");

                history.go(-1);

                break;

            case "muteButton":

                sndManager.toggleMute();
                sndManager.initMuteButton(muteBtn);

                break;

            case "swipeButton":

                this.gotoScreen(SwipeToUnmaskSelectScreen);

                break;

            case "playButton":

                sndManager.playSound("buttonClick");

                this.gotoScreen(CharacterSelectScreen);

                break;

            case "howToPlayButton":

                //this.manager.dialogManager.open(InstructionsDialog, {});

                sndManager.playSound("buttonClick");

                break;
        }
    };

    this.pause = function()
    {

    };

    this.destroy = function()
    {
        this.name = null;
        this.manager = null;
        this.parent = null;
    };

    this.removeDiv = function(id)
    {
        var element = document.getElementById(id);
        element.parentNode.removeChild(element);
    };

    this.createDiv = function(className, id)
    {
        if (!id) id = className;

        var pDiv = document.createElement("div");

        pDiv.className = className;
        pDiv.id = id;

        return pDiv;
    }
}