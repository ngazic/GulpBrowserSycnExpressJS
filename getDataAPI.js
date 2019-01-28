var Request = require("request");
var factory = require('./factory');
var factory = new factory();
users = factory.create("food");

module.exports = {
    db: users,
    get: function (query,perPage,currentPage) {
        const format = 'json';
        const apiKey = '5NmIFUxjbzwH9acl5mNmSad6sUkBuBKJdsK1tblt';
        var query = query;
        query = query == undefined || '' ? 'butter' : query;
        console.log(query);
        var perPage = 25;
        var startItem = currentPage*25+1;
        const url = `https://api.nal.usda.gov/ndb/search/?format=${format}&q=${query}&max=${perPage}&offset=${startItem}&ds=Standard%20Reference&sort=r&api_key=${apiKey}`;
        users.createTableFood();
        return new Promise(function (resolve, reject) {
            query = query;
            query = query !== '' ?  query : 'butter';
            console.log(query);
            console.log("get Data API");
            var data = '';
            users.name = query;
            users.getByName(users,startItem).then(function (result) {
                if(result.length>0){
                    result.fromDb = true;
                    resolve (result);
                }
                else {
                    Request.get(url, (error, response, body) => {
                        if (error) {
                            reject(error);
                        }
                        var body = JSON.parse(body);
                        data = body.list.item;
                        data.fromDb = false;
                        data.total = body.list.total;
                        data.forEach(element => {
                            users.add(element.name,element.manu,query);
                        });
                        resolve(data);
                    });
                }
            });

        })
    }
};