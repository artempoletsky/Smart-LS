(function () {
    //if Samsung 11
    if (typeof localStorage == "undefined" && typeof FileSystem == "function") {
        var fileSysObj = new FileSystem();
        var commonDir = fileSysObj.isValidCommonPath(curWidget.id);
        if (!commonDir) {
            fileSysObj.createCommonDir(curWidget.id);
        }
        var fileName = curWidget.id + "_localStorage.db";
        var lStorage = {};
        var changed = false;

        // load or init localStorage file
        var fileObj = fileSysObj.openCommonFile(fileName, "r+");
        if (fileObj !== null) {
            try {
                lStorage = JSON.parse(fileObj.readAll());
            } catch (e) {
                alert(e);
            }
        } else {
            fileObj = fileSysObj.openCommonFile(fileName, "w");
            fileObj.writeAll("{}");
        }
        fileSysObj.closeCommonFile(fileObj);

        // Save storage
        var saveFile = function (delay) {
            if (changed && typeof JSON == 'object') {
                var $this = this;
                var save = function () {
                    fileObj = fileSysObj.openCommonFile(fileName, "w");
                    fileObj.writeAll(JSON.stringify($this));
                    fileSysObj.closeCommonFile(fileObj);
                    changed = false;
                };
                if (typeof delay != 'undefined' && delay) {
                    setTimeout(save, 100);
                }
                else {
                    save();
                }
            }
        };


        window.localStorage = {
            setItem: function (key, value) {
                changed = true;
                this[key] = value;
                saveFile(true);
                return this[key];
            },
            getItem: function (key) {
                return this[key];
            },
            removeItem: function (key) {
                delete this[key];
                saveFile(true);
            },
            clear: function(){
                for(var key in this){
                    if(typeof this[key]!='function'){
                        delete this[key];
                    }
                }
                saveFile(true);
            }
        };
    }
})();