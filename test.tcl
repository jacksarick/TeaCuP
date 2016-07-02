#!/usr/bin/tclsh

# Open connection
set chan [socket localhost 3333]

# Things we want to say
set messages {
	{{"user":"jack","pass":"password"}}
	{{"req":"get", "table":"things", "query":["numbers"], "filter":"function(o){ return o > 100 } "}}
}

# set messages {
# 	{{"user":"jack","pass":"password"}}
# 	{{"req":"checkout", "table":"things", "token":"password"}}
# 	{{"req":"checkin", "table":"things", "token":"password"}}
# }

# set messages {
# 	{{"user":"jack","pass":"password"}}
# 	{{"req":"get", "table":"things"}}
# 	{{"req":"put", "token":"password", "table":"things", "query":["names","john"], "val":40}}
# 	{{"req":"get", "table":"things"}}
# }

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