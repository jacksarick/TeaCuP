#!/usr/bin/tclsh

# Open connection
set chan [socket localhost 3333]

# Things we want to say
set messages {
	{echo hello}
	{load password things}
}

puts "---"

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

puts "---"