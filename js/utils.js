utils = {
	convert: function(data, fail) {
		// Try to convert data to JSON
		try	{
			return [true, JSON.parse(data.toString())];
		}

		// If we fail, let the user know
		catch(err) {
			return fail(err);
		}
	},

	token: function(length) { return Math.random().toString(36).substr(2, length+2); },
	contain: function (array, value) { return array.indexOf(value) > -1 },
}

module.exports = utils;