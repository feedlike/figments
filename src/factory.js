import dom from "jsx-render";
import vex from "vex-js";

import { sortLayerByListPosition } from './core/utilities';

import { isEmpty } from "lodash";

class Factory {
    
    constructor(figments) {
        this.figments = figments;
        this.vex = vex;
        
        this.vex.registerPlugin(require("vex-dialog"));
        this.vex.defaultOptions.className = "vex-theme-plain";

        this.isInjecting = false;              
    }
    
    run() {
        console.log("🔌 Waiting for Figma");
        this.isInjecting = true;
        
        const pollingRun = setInterval(() => {
            const buttonGroup = document.querySelector(
                ".toolbar_view--buttonGroup--2wM3n"
            );
            if (buttonGroup) {
                this.init();
                clearInterval(pollingRun);
            }
        }, 1000);
    }
    
    init() {
        this.isInjecting = false;
        console.log("🔌 Initilizing");
        const buttonGroup = document.querySelector(".toolbar_view--buttonGroup--2wM3n");
        
        const markup = <span className="toolbar_view--actionButtonContainer--J2txY">
        <span id="figments-trigger" className="toolbar_view--iconButton--Zxsnv enabledButton-3">
        <img className="svg" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0OTIuNjE2IDQ5Mi42MTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5Mi42MTYgNDkyLjYxNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00NjguMiwxMzUuNzQyYy0yMi43LTUwLjgtNjMuOS05MC45LTExNi0xMTMuMWMtODIuNy0zNS4yLTE3MC43LTI4LjQtMjQxLjYsMTguNUM0MS4zLDg2Ljk0MiwwLDE2My43NDIsMCwyNDYuNjQyICAgIGMwLDYyLjQsMjMuMywxMjEuOSw2NS43LDE2Ny41YzQyLjIsNDUuNCw5OS4zLDczLjEsMTYwLjksNzhjMC45LDAuMSwxLjgsMC4xLDIuNywwLjFjOC43LDAsMTcuMi0zLjMsMjMuNi05LjMgICAgYzcuMi02LjcsMTEuNC0xNi4xLDExLjQtMjZ2LTc1LjljMC0xLjEtMC4xLTIuMi0wLjMtMy4yYzAuMi0xLDAuMy0yLjEsMC4zLTMuMmMwLTkuOS04LjEtMTgtMTgtMThjLTQ1LjcsMC04Mi44LTM3LjEtODIuOC04Mi44ICAgIHYtNTQuNmgxNjUuNnY1NC42YzAsMjMtOS43LDQ1LjEtMjYuNSw2MC43Yy03LjMsNi44LTcuNywxOC4xLTEsMjUuNGM2LjgsNy4zLDE4LjEsNy43LDI1LjQsMWMyNC4yLTIyLjQsMzgtNTQuMiwzOC04Ny4xdi03Mi42ICAgIGMwLTkuOS04LjEtMTgtMTgtMThoLTM5LjJ2LTU5YzAtOS45LTguMS0xOC0xOC0xOGMtOS45LDAtMTgsOC4xLTE4LDE4djU5aC01MS4ydi01OWMwLTkuOS04LjEtMTgtMTgtMThjLTkuOSwwLTE4LDguMS0xOCwxOHY1OSAgICBoLTM5LjJjLTkuOSwwLTE4LDguMS0xOCwxOHY3Mi42YzAuMSw1OS41LDQzLjksMTA4LjgsMTAwLjksMTE3LjV2NjQuOWMtMTA3LjktOS4xLTE5Mi4zLTEwMS0xOTIuMy0yMDkuNSAgICBjMC03MC44LDM1LjMtMTM2LjQsOTQuNS0xNzUuNWM2MC42LTQwLjEsMTM2LjMtNDUuNywyMDcuNi0xNS40YzQzLjcsMTguNSw3OC4yLDUyLjIsOTcuMiw5NC43YzQwLjYsOTAuOSwyMS40LDE5MC4zLTQ5LDI1My4xICAgIGMtNy40LDYuNi04LjEsMTgtMS40LDI1LjRjNi42LDcuNCwxOCw4LjEsMjUuNCwxLjRjMzguNy0zNC42LDY1LjEtNzkuNCw3Ni40LTEyOS44QzQ5OC43LDI0Ni44NDIsNDkyLjQsMTg5Ljg0Miw0NjguMiwxMzUuNzQyeiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
        </span>
        <div id="figments-dropdown" class="pointing_dropdown--root--28JAG" style={{display: "none"}}>
        <div class="pointing_dropdown--arrow--Lu8iU" />
        <div id="figments-menu" class="dropdown--dropdown--35dH4 pointing_dropdown--content--2os_K">
        
        </div>
        <div id="figments-overlay" />
        </div>
        </span>;
        
        this.figmentOptionTemplate = (
            <a class="dropdown--option--20q-- dropdown--optionBase--2PiCW white_text--whiteText--1kui1" rel="noopener">
            <span>action</span>
            </a>
        );
        
        buttonGroup.appendChild(markup);
        
        this.figmentsDropdown = document.getElementById("figments-dropdown");
        this.figmentsMenu = document.getElementById("figments-menu");
        this.figmentsTrigger = document.getElementById("figments-trigger");
        this.figmentsOverlay = document.getElementById("figments-overlay");
        
        this.figmentsTrigger.addEventListener("click", this.toggleDropdown.bind(this));
        this.figmentsOverlay.addEventListener("click", this.toggleDropdown.bind(this));
        
        this.setupPlugins();
    }
    
    addOption (name, action) {
        const option = this.figmentsMenu.appendChild(this.figmentOptionTemplate);
        option.innerText = name;
        option.addEventListener("click", action);
        option.addEventListener("click", this.toggleDropdown.bind(this));
    }
    
    toggleDropdown () {    
        if(this.figmentsDropdown.style.display === "none") {
            
            const triggerRect = this.figmentsTrigger.getBoundingClientRect();
            this.figmentsTrigger.classList.add("activeButton-3");
            
            this.figmentsDropdown.style.display = "block";
            this.figmentsDropdown.style.left = (triggerRect.left + (triggerRect.width / 2) - 6) + "px";
            
            const menuRect = this.figmentsMenu.getBoundingClientRect();
            this.figmentsMenu.style.left = triggerRect.left + (triggerRect.width / 2) - (menuRect.width / 2) + "px";
        }
        else {
            
            this.figmentsDropdown.style.display = "none";
            this.figmentsTrigger.classList.remove("activeButton-3");
        }
        
    }
    
    setupPlugins() {
        console.log("🔌 Setting up plugins");
        const figments = this.figments;
        const keys = Object.keys(figments);
        
        if (keys.length === 1 && keys[0] === "default") {
            console.log("🔌 No figments found.");
        } else {
            keys.map((key, index) => {
                const plugin = figments[key];
                
                plugin.setup();
                console.log(`🔌 Plugin added: ${plugin.name}`);
                
                this.addOption(plugin.name, plugin.main.bind(plugin));
                
                if (index === keys.length - 1) {
                    console.log("🔌 All set!");
                }
            });
        }
    }
    
    getSelectedLayers() {
        
        /*
        Figma does not provide all layer properties when accessed via sceneGraph.get(key)
        We can get more properties by using other means.
        */
        
        const { App } = window;
        
        const sceneGraphSelection = App._state.mirror.sceneGraphSelection;    
        
        if(isEmpty(sceneGraphSelection)) {
            //nothing is selected
            return [];
        }
        
        const selectionIds = Object.keys(sceneGraphSelection);
        const pagesList = App._state.mirror.appModel.pagesList;
        const bounds = App.sendMessage("getBoundsForNodes",{nodeIds: selectionIds}).args;
        
        // here we will store our selected layers info
        let layers = [];
        
        //loop through each layer and cache its properties
        selectionIds.map(id => {
                        
            //get a copy of its properties
            const sceneGraph = App._state.mirror.sceneGraph.get(id);
            const parentSceneGraph = App._state.mirror.sceneGraph.get(sceneGraph.parent);
            const currentPageId = App._state.mirror.appModel.currentPage;
            const currentPageName = pagesList[currentPageId];
            
            //cache them
            layers.push({
                id: id,
                name: sceneGraph.name,
                width: bounds[id].width,
                height: bounds[id].height,
                position: sceneGraph.position,
                pageName: currentPageName,
                parentName: parentSceneGraph.name,
                x: bounds[id].x,
                y: bounds[id].y,
                type: sceneGraph.type
            });
            
        });
        
        //make sure that the layers array is sorted the same as Figma's layers list
        layers.sort(sortLayerByListPosition);
        layers = layers.reverse();
        
        return layers;
    }
    
    renameLayer(layerId, newName) {
        App.sendMessage('setNodeProperty', {
            nodeId: layerId,
            property: 'name',
            value: newName
        });
    }

    toast(message) {
      App._store.dispatch({
        type: "VISUAL_BELL_ENQUEUE",
        payload: {
            message: message || ""
          }
      });
    }
    
    
}

export default Factory;