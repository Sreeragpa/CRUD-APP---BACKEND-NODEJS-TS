import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'delyrsoej', 
  api_key: '289144977217119', 
  api_secret: 'LQXLF7SkEFkVlEYaXZYr5NvFatw' 
});


cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });