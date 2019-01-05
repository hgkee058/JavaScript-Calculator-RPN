var priorities = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3
};

function ExpressionToRPN(expression) {
    var result = [];
    var stack = [];
    var subToken = "";
    
    for (var i = 0; i < expression.length; i++) {
        token = expression.charAt(i);
        if (priorities[token] == undefined && token != '(' && token != ')') 
        {
            subToken += token;
        } 
        else 
        {
            if(subToken.length > 0)
            { 
                result.push(subToken); 
                subToken = ""; 
            }
            
            if (token == '(') 
            {
                stack.push(token);
            } 
            else if (token == ')') 
            {
                while (stack[stack.length - 1] != '(') {
                    result.push(stack.pop());
                }
            } 
            else {
                    if (priorities[token] > priorities[stack[stack.length - 1]] || stack.length == 0) 
                    {
                        stack.push(token);
                    } 
                    else {
                        while (priorities[stack[stack.length - 1]] >= priorities[token]) {
                            if (stack[stack.length - 1] == '(') {
                                break;
                            }
                            result.push(stack.pop());
                        }
                        stack.push(token);
                    }
            }
        }
    }

    if(i == expression.length)
    { 
        if(subToken.length > 0)
        { 
            result.push(subToken); 
            subToken = ""; 
        } 
    }

    while (stack.length !== 0) {
		if(stack[stack.length - 1] != '('){
			result.push(stack.pop());
		}
		else{
			stack.pop();
		}
    }
    
    return result;
}

function CalculateRPN(result) {
    var stack = [];
    for (i = 0; i < result.length; i++) 
    {
        if (priorities[result[i]] === undefined) 
        {
			stack.push(result[i]);
        } 
        else {
			var a = stack.pop();
			var b = stack.pop();
			if (result[i] === "/" && a === 0) {
				throw new Error("Divide by zero");
			}
            if(result[i] === "^")
            {
				stack.push(eval("Math.pow(parseFloat(b),parseFloat(a))"));
            }
            else
            {
				stack.push(eval("parseFloat(b)" + result[i] + "parseFloat(a)"));
			}
		}
	}
	return stack;
}