# f = open("a.dua", "r")
# print(f.read()) 

tree = {
	"type": "STM",
	"lhs" : {
		"type" : "VAR",
		"val" : "a"
	},
	"op" : {
		"type" : "EQ"
	},
	"rhs" : {
		"type" : "LIT",
		"val" : "1"
	}
}

var = {}

def execStatement(stm = {}):
	var[stm["lhs"]["val"]] = stm["rhs"]["val"]

def exec(tree):
	print("Hello world")

	if (tree["type"] == "STM"):
		execStatement(tree)


exec(tree)	
print(var)