conn = new Mongo();
db = connect("localhost:27017/myApp");
//variable object to store previous and new location co-ordinates 
var prev_location = {};
var new_location = {};
//variable string to store previous and new location time 
var prev_time, new_time;
//variable array that will save different users
var users = db.geolocations.distinct('user')

for(var i = 0; i < users.length; i++) {
    cursor = db.geolocations.find({
        $and: [{
            processed: 0
        }, {
            user: users[i]
        }]
    });
    while(cursor.hasNext()) {
        var a = cursor.next();
        printjson(a)
    }
}
//call method to calculate distance
//
//print(haversineDistance(start, end, {
//    unit: 'km'
//}));
// returns radians

    function toRad(num) {
        return num * Math.PI / 180
    }
    //calculate distance between two co-ordinates

    function haversineDistance(start, end, options) {
        var km = 6371
        var mile = 3960
        options = options || {}
        var R = options.unit === 'mile' ? mile : km
        var dLat = toRad(end.latitude - start.latitude)
        var dLon = toRad(end.longitude - start.longitude)
        var lat1 = toRad(start.latitude)
        var lat2 = toRad(end.latitude)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        if(options.threshold) {
            return options.threshold > (R * c)
        } else {
            return R * c
        }
    }