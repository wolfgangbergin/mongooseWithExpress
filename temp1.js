
	const myArray = [1, 2, 3, 4, 5,6,7,8,9,10]; 

	// A function that returns a promise 
	// that resolves after a random delay 
	async function doSomethingAsync(item) { 
		return new Promise(resolve => { 
			setTimeout(() => { 
				console.log(item); 
				resolve(); 
			}, Math.random() * 1000); 
		}); 
	} 

	async function main() { 

		// Wait for all promises returned by 
		//doSomethingAsync to resolve. 
		await Promise.all( 
		
			// Use map to create an array of promises, 
			// with one promise for each item in myArray. 
			myArray.map(async item => { 
				
				// Wait for the promise returned by 
				//doSomethingAsync to resolve. 
				await doSomethingAsync(item); 
			}) 
		); 

        console.log('Done');
	} 

	// Call main to start the program. 
	main(); 
