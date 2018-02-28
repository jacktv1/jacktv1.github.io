<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ajax Advandce</title>
</head>
<body>
    <form action="#">
        <input type="text" id="array-number">
        <button type="button" id="btn-cal">Calculate</button>
    </form>
    <hr>
    <form action="upload.php" method="post" enctype="multipart/form-data">
        <input type="hidden" name="txt" value="txt">
        <input type="file" id="file" name="file" required>
        <button type="submit">Upload</button>
    </form>
    <span id="progress"></span>
    <script src="jquery.js"></script>
    <script src="jquery.form.js"></script>
    <script>

        $(document).ready(function() {

            // Calculate sum and multiple
            $('#btn-cal').on('click', function() {
        
                var $stringNumber = $('#array-number').val();
                var array = $stringNumber.split(',');
                var data = JSON.stringify(array);

                $.ajax({
                   url: 'sum-multi.php',
                   method: 'post',
                   data: {'data': data },
                }).done((response) => {
                   
                    var result = JSON.parse(response);
                    alert("sum: "+ result.sum + " - multiple: "+ result.multiple);
                });
                
            });

            // Upload file

            // $('#form-upload').on('submit', function(e) {
            //     e.preventDefault();
            //     var $fileData = $('#file').prop('files')[0];  
            //     var filename = $('#file').val().split('\\').pop();
            //     // var fileSize = $fileData.prop('files')[0].size;
            //     if ($fileData.size >= 5120) {
                   

                  
            //         $('#form-upload').ajaxSubmit( {

            //             uploadProgress: function(event, position, total, percentComplete) {
            //                 var percentValue = percentComplete + '%';
            //                 console.log(percentComplete);
            //                 $('#progress').html(percentValue);
            //             },  
            //             complete: function(xhr) {
            //                 alert(xhr.responseText);
            //             }            
            //         });
            //     } else {
            //         alert("File size must larger than 5Mb");
            //     }
               
            // });
        });
    </script>
</body>
</html>