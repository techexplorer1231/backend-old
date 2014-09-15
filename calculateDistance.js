conn = new Mongo();
db = connect("localhost:27017/myApp");
//variable trip_start, trip_end
var trip_start = false;
var trip_end = false;
//variable object to store previous and new location co-ordinates 
var prev_location = {};
var new_location = {};
//variable string to store previous and new location time 
var prev_time, new_time;
//variable to store total distance
var totalDistance;
// variable to store cursor count
var cursorCount;
//variable array that will save different users
var users = db.geolocations.distinct('user')
print(users[0])
for(var i = 0; i < users.length; i++) {
    totalDistance = 0;
    cursorCount = 0;
    cursor = db.geolocations.find({
        $and: [{
            processed: '0'
        }, {
            user: users[i]
        }]
    });
	if( db.distances.find({user : users[i]}).count() == 0 ){
		totalDistance = 0;
		db.distances.insert({name : users[i] , distances : 0})
	}else{
		totalDistance = 0;
	}
	while(cursor.hasNext()) {
		var a = cursor.next();
		//if speed is greater than average human walking speed
		if(a.location.speed < 5 && trip_start === false && trip_end === false) {
			new_location = {
				latitude: a.location.latitude,
				longitude: a.location.longitude
			}
			prev_location = {};
			trip_start = true;
			trip_end = false;
		} else if(a.location.speed > 5 && trip_start === true && trip_end === false) {
			prev_location = {
				latitude: new_location.latitude,
				longitude: new_location.longitude
			}
			new_location = {
				latitude: a.location.latitude,
				longitude: a.location.longitude
			}
			totalDistance += (haversineDistance(prev_location, new_location, {
				unit: 'km'
			}));
			print('i ran when speed > 5')
			trip_start = true;
			trip_end = false;
		} else if(a.location.speed < 5 && trip_start === true && trip_end === false) {
			prev_location = {
				latitude: new_location.latitude,
				longitude: new_location.longitude
			}
			new_location = {
				latitude: a.location.latitude,
				longitude: a.location.longitude
			}
			totalDistance += (haversineDistance(prev_location, new_location, {
				unit: 'km'
			}));
			print('i ran when speed < 5')
			trip_start = false;
			trip_end = false;
		} else if(a.location.speed > 5 && trip_start === false && trip_end === false) {
			prev_location = {
				latitude: new_location.latitude,
				longitude: new_location.longitude
			}
			new_location = {
				latitude: a.location.latitude,
				longitude: a.location.longitude
			}
			totalDistance += (haversineDistance(prev_location, new_location, {
				unit: 'km'
			}));
			trip_start = true;
			trip_end = false;
			print('i ran when after speed = 5')
		}
	}
print(totalDistance + users[i]);
	db.distances.update( {name : users[i]},{name : users[i], distance : totalDistance},{ upsert: true });
}
//call method to calculate distance
// print(haversineDistance(start, end, {
//    unit: 'km'
// }));
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