function insertBooks(listElem, books){


    books.forEach( book => {

    	let title = document.createElement('h3');
        title.innerText = book.title;
        
        var clickButton = document.createElement('button');
        clickButton.innerText = 'click';
        clickButton.classList.add('more');
        
        var deleteButton = document.createElement('button');
        deleteButton.innerText = 'delete';
        deleteButton.classList.add('delete');

        let li = document.createElement('li');
        li.dataset.id=book.id;

        li.appendChild(title);
        li.appendChild(clickButton); 
        li.appendChild(deleteButton);
        
        listElem.appendChild(li);
    });
}

function showDiv( book, id){

	var thisLi;
	var li = document.querySelectorAll('li');
	for (var i = 0; i < li.length; i++) {
		if (li[i].getAttribute("data-id") == id) {
			thisLi = li[i];
			thisLi.addEventListener('click', function(e) {
		    	e.stopPropagation();
		    })
		}
	}
	
	var author = document.createElement('h5');
    author.innerText = book.author;
    
    var isbn = document.createElement('h5');
    isbn.innerText = book.isbn;
    
    var publisher = document.createElement('h5');
    publisher.innerText = book.publisher;

    var type = document.createElement('h5');
    type.innerText = book.type;

    thisLi.appendChild(author);
    thisLi.appendChild(isbn);
    thisLi.appendChild(publisher);
    thisLi.appendChild(type);
}


document.addEventListener("DOMContentLoaded",function(){
	
	var ul = document.querySelector('ul.books');
	
	$.ajax({
		url: "http://localhost:8080/Warsztaty_SpringMVC_REST/books/getBooks",
		type: "GET",
		dataType: "json"
	})
	.done( books => insertBooks(ul, books) );
	
	$(ul).on('click', function(e){
        if(e.target.classList == 'more') {	
            var parent = e.target.parentElement;
            var id = parent.getAttribute("data-id");
            $.ajax({
        		url: "http://localhost:8080/Warsztaty_SpringMVC_REST/books/getBook/" + id,
        		type: "GET",
        		dataType: "json"
        	})
        	.done( book => showDiv(book, id) );
        } else if(e.target.classList == 'delete') {	
            var parent = e.target.parentElement;
            var id = parent.getAttribute("data-id");
            $.ajax({
        		url: "http://localhost:8080/Warsztaty_SpringMVC_REST/books/deleteBook/" + id,
        		type: "DELETE",
        	})
        	.done( function() { alert('DELETE completed'); } );
        }
  
    })
    
    /*var submit = document.querySelector('.btn');
    console.log(submit);
	$(submit).on('click', function(event) {
		var book = [{ "isbn": "3657142857143" },
		            { "title": "Dziadki" },
		            { "publisher": "Helion" },
		            { "type": "programming" },
		            { "author": "Stanislaw Ignacy Miskiewicz" }];
		var book = '{"isbn":"34321", "title":"Thinking in Java","publisher":"Helion","type":"programming","author":"Bruce Eckel"}'
		$.ajax({
    		url: "http://localhost:8282/books",
    		data: book,
    		//data: 'Content-Type: application/json, {"isbn":"34321","title":"Thinking in Java","publisher":"Helion","type":"programming","author":"Bruce Eckel"}',
    		contentType: "Content-Type: application/json",
    		type: "POST",
    		dataType: "json"
    	})
    	.done (function() { alert('POST completed'); } )
		.fail (function() { alert('POST failed'); } );
	});*/
	
});