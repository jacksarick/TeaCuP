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
	}
}

module.exports = utils;