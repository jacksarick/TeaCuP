#!/usr/bin/tclsh

# Open connection
set chan [socket localhost 3333]

# Things we want to say
set messages {
	{{"user":"jack","pass":"password"}}
	{{"req":"get", "table":"things"}}
	{{"req":"get", "table":"things", "query":["names","john"]}}
	{{"req":"get", "table":"things", "query":["numbers"], "filter":"x > 140"}}
}

set messages {
	{{"user":"jack","pass":"password"}}
	{{"req":"checkout", "table":"things", "token":"password"}}
	{{"req":"checkin", "table":"things", "token":"password"}}
}

# Listen for connection
puts "=> [gets $chan]"

for {set i 0} {$i < [llength $messages]} {incr i} {
	# Say our thing to console
    puts "<= [lindex $messages $i]"
    # Say our thing to server
	puts $chan [lindex $messages $i]

	# Flush connection
	flush $chan

	# Listen for response
	puts "=> [gets $chan]"
}

puts "Done"