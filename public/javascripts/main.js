var responseBoxTemplate = 
`<div class="responseItem">
	<div class="queryText">
		<p>
			<strong>You:</strong>
			<span>{0}</span>
		</p>
	</div>
	<div class="responseText">
		<p>
			<strong>Bot:</strong>
			<span>{1}</span>
		</p>
	</div>
</div>`;
jQuery(document).ready(function($) {
	$("#interactionForm").on('submit', function(e) {
	  e.preventDefault();
	  var question = $("#questionInput").val();
	  var csrftoken = $('#csrftoken').val();
	  $.ajax({
	    url: "/ask",
	    type: "POST",
	    dataType: "json",
	    data: {
	    	"_csrf": csrftoken,
	    	"query": question
	    },
	    success: function(response) {
	    	console.log(response);
	      var data = JSON.parse(JSON.stringify(response));
	      if(data.error) {
	      	swal({
	      		type: 'error',
	      		title: 'Opps',
	      		text: 'We seems too tired that why we cannot response to you at the moment, please ask again.'
	      	})
	      } else {
	      	var queryText = data.result.Query ? data.result.Query : 'undefined';
	      	var answer = data.result.Response ? data.result.Response : 'undefined';
	      	var renderedTemplate = responseBoxTemplate.format(queryText, answer);
	      	$('#resultBox').append(
	      		renderedTemplate
	      	);
	      }
	    },
	    error: function(error) {
	      swal("Opps", error, "error");
	    }
	  });
	});
});