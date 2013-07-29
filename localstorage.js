(function () {
    var userAgent=navigator.userAgent.toLowerCase();
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
                //(e);
            }
        } else {
            fileObj = fileSysObj.openCommonFile(fileName, "w");
            fileObj.writeAll("{}");
        }
        fileSysObj.closeCommonFile(fileObj);

        // Save storage
        var saveFile = function (delay) {
            if (changed && typeof JSON == 'object') {
                var $this = window.localStorage;
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


        lStorage.setItem = function (key, value) {
            changed = true;
            this[key] = value;
            saveFile(true);
            return this[key];
        };
        lStorage.getItem = function (key) {
            return this[key];
        };
        lStorage.removeItem = function (key) {
            delete this[key];
            saveFile(true);
        };
        lStorage.clear = function () {
            var self = this;
            for (var key in self) {
                if (typeof self[key] != 'function') {
                    delete self[key];
                }
            }
            saveFile(true);
        }
        window.localStorage = lStorage;
    }else if(userAgent.indexOf('maple')!=-1 && typeof FileSystem == "function"){//if newer samsung
        var fileSysObj = new FileSystem();
        var commonDir = fileSysObj.isValidCommonPath(curWidget.id);
        if (!commonDir) {
            fileSysObj.createCommonDir(curWidget.id);
        }
        var fileName = curWidget.id + "_localStorage.db";

        var fileObj = fileSysObj.openCommonFile(fileName, "r+");
        if (fileObj !== null) {
            try {
                JSON.parse(fileObj.readAll());
            } catch (e) {
                localStorage.clear();//if file is empty, app was removed
            }
        } else {
            fileObj = fileSysObj.openCommonFile(fileName, "w");
            fileObj.writeAll("{}");
        }
        fileSysObj.closeCommonFile(fileObj);
    }
}());