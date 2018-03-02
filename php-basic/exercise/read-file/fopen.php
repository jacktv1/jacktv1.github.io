<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <title>Ajax Advandce</title>
</head>
<body>

    <form action="upload.php" id="form-upload" method="post" enctype="multipart/form-data" onsubmit="return false;">
        <input type="hidden" name="txt" value="txt">
        <input type="file" id="file" name="file" required>
        <button type="submit">Upload</button>
    </form>
    <div class="progress-bar-container">
        <div id="progress-bar"></div>
        <span id="percent"></span>
    </div>
    <p id="result"></p>
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/jquery.form.js"></script>
    <script>

        $(document).ready( function() {

            // Upload file

            $('#form-upload').on('submit', function(e) {
                e.preventDefault();

                var $fileData = $('#file').prop('files')[0];
                  
                $('#form-upload').ajaxSubmit( {

                    uploadProgress: function(event, position, total, percentComplete) {
                        var percentValue = percentComplete + '%';
                        $('#progress-bar').css('width',percentValue);
                        $('#percent').html(percentValue);
                    },  
                    complete: function(xhr) {
                        $('#percent').html('100%');
                        $('#result').html(xhr.responseText);;
                    }            
                });
                
                return false;
            });
        });
    </script>
</body>
</html>