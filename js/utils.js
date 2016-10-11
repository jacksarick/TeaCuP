// Basic method for testing if a list contains a value
Array.prototype.contains = function (value) { return this.indexOf(value) > -1 };

// Basic method for testing if an object contains a key
Object.prototype.has = function (key) { return this[key] != undefined };

// Function to clean up the input
function clean(string) {
	// split the string on each space
	let r = string.split(" ");

	// Take all except the first
	r = r.slice(1, r.length).join(" ");

	// return result
	return r;
}

// Function to pull data from a given path
function find(data, path) {
	// This is actually a cool little piece of code IMO. The recursion loops through each argument and applys them one by one to the data
	if (path.length === 0){
		return data;
	}

	return find(data[path.shift()], path);
}

// Function to change a var at the end of a path
function update(data, path, value) {
	// Pretty much the same as GET, but returns full lists, and returns the new value instead of the actual
	if (path.length === 1){
		data[path[0]] = value;
		return data;
	}

	data[path[0]] = update(data[path.shift()], path, value);
	return data;
}