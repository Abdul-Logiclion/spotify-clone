let songsnames;
let currentSong = null; // Initialize currentSong with null
let isAudioPlaying=false
let currentSongPath;
document.addEventListener('DOMContentLoaded', () => {
    // Call getSongs function and pass displaySongs as a callback
    getSongs(displaySongs);

});

function getSongs(callback) {
    // Fetch the contents of the folder
    fetch('./songs')
        .then(response => {
            // Check if fetch was successful
            if (!response.ok) {
                throw new Error('Failed to fetch songs');
            }
            return response.text();
        })
        .then(data => {
            // Parse the HTML string into a DOM document
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            
            // Access the <table> element
            const tableElement = doc.querySelector('table');
            
            // Access each <a> element within the <td> elements
            const anchorElements = tableElement.querySelectorAll('td > a');

            // Call the callback function and pass the anchorElements
            callback(anchorElements);
        })
        .catch(error => {
            // Log any errors that occur during the fetch request
            console.error('Error fetching songs:', error);
        });
}

function displaySongs(anchorElements) {
    let ulElement = document.querySelector('.lib-body > ul');
 //   console.log("Ul List:", ulElement, '\n \n \n');

    //let songsnames = ""; // Initialize song names variable

    // Convert NodeList to an array and then iterate over it
    Array.from(anchorElements).forEach(anchor => {
        const href = anchor.getAttribute('href');
        const decodedHref = decodeURIComponent(href); // Parse %20 from the path

        // Check if the href ends with ".opus"
        if (href.endsWith('.opus')) {
            // Append the song name to the songsnames variable
            songsnames += decodedHref.trim() + "\\";
            // Rest of your code remains the same...
            const liElement = document.createElement('li');

            // Create an image element for the music icon
            const musicIcon = document.createElement('img');
            musicIcon.src = 'music-note-03.svg';
            musicIcon.alt = 'Music Icon';
            liElement.appendChild(musicIcon);
             let name=decodedHref.trim().split('\\')
            // Create a new text node with the decoded href
            const textNode = document.createTextNode(name[name.length-1]);
            liElement.appendChild(textNode);

            // Create an image element for the play button
            const playButton = document.createElement('img');
            playButton.src = 'play-circle.svg';
            playButton.alt = 'Play Button';
            liElement.appendChild(playButton);
            liElement.addEventListener('click',()=> {
                    playMusic(decodedHref.trim())
        
            })
            // Append the <li> element to the <ul>
            ulElement.appendChild(liElement);
        }

        
    });

    // Rest of your code remains the same...\\\



    }

const playMusic=(pathParams)=>
{
   console.log("insdie play muscic",pathParams)

    if (!isAudioPlaying) { // Check if audio is not currently playing
                let songNames = pathParams.split('\\');
            
                // Extract the filename (last element in the array)
              let filename = songNames[songNames.length - 1];
                   currentSongPath=filename;
                    console.log("\n playmusic played function")
                // Construct the path using forward slashes
                let path = './songs/' + filename;
           //   console.log("in isaudio condition ",songNames)
                // Check if there's already an audio playing
                if (currentSong) {
                    // If so, stop the playback
                    currentSong.pause();
                    currentSong.currentTime = 0; // Reset the playback to the beginning
                }
            
                // Create a new Audio object for the selected song
                currentSong = new Audio(path);
    
                currentSong.addEventListener('canplaythrough', () => {
                    // Start playback once the audio is fully loaded
                    currentSong.play();
                    playCircleImage.src = "pause.svg";
                });
            
                // Optional: Add event listener for 'error' event to handle any loading errors
                currentSong.addEventListener('error', (error) => {
                    console.error('Error loading audio:', error);
                });
    
                // Update playback flag
    
               // isAudioPlaying = true;
            
                // Now you can use the 'currentSong' variable to control playback or perform any other operations
            }
    
           // console.log("again clicked ")
           if (currentSong) {
            // Define the callback function
            function handleSongEnd() {
                isAudioPlaying = false;
                currentSong.removeEventListener('ended', handleSongEnd);
                currentSong = null; // Reset currentSong when playback ends
                const playCircleImage = document.querySelector('.abovebar .playbuttons img:nth-child(2)');
                playCircleImage.src = "play-circle.svg";
                console.log("Song finished in playmusic");
            }
        
            // Add the event listener using the callback function
            currentSong.addEventListener('ended', handleSongEnd);
        }
    
}

const playCircleImage = document.querySelector('.abovebar .playbuttons img:nth-child(2)');

playCircleImage.addEventListener("click", () => {
    if (currentSong == null) {
        console.log("\n Inside play circle null image..\n");
        let song = songsnames.split('\\');
        console.log(song);
        currentSongPath = song[2];
        currentSong = new Audio('./songs/' + song[2]);
        currentSong.play();
        console.log(currentSong.src, " is playing...");
        playCircleImage.src = "pause.svg";
    } else if (currentSong.paused) {
        currentSong.play();
        console.log(currentSong.src, " is playing...");
        console.log("\n Paused inside play circle image \n");
        playCircleImage.src = "pause.svg";
    } else {
        currentSong.pause();
        console.log(currentSong.src, " was paused...");
        playCircleImage.src = "play-circle.svg";
    }

    if (currentSong) {
        // Define the callback function
         removeEvents()
    }
    else{
        return
    }
});
     


const prev = document.querySelector('.abovebar .playbuttons img:nth-child(1)');

prev.addEventListener('click',()=>{
    console.log("inside  previus ")
    if(currentSong==null)
    {

        console.log("inside previous null current song")
       let song=songsnames.split('\\');
       
       currentSongPath=song[2]
       currentSong=new Audio('./songs/'+song[2])
       currentSong.play();
       console.log(currentSong.src," is playing...")
       playCircleImage.src = "pause.svg"
       removeEvents();
       return
    }
   
    
    let songs=songsnames.split('\\')
 
    let finalSongs=[];

    for(let song of songs )
    {
        if(song.endsWith(".opus"))
        {
            finalSongs.push(song);
            //console.log(song)
        }
    }

    console.log("before final previous loop",finalSongs)
      let prevPlay=false;
   for(let i=0;i<finalSongs.length;i++)
   {

    
    //console.log(songName)

    if(finalSongs[i]==currentSongPath)
    {
        console.log("paths and text inside comparison condition of previous image",finalSongs[i],currentSong,"insdie current song path if condition")
        prevPlay=true;
        continue;
        
    }
    if(prevPlay&i>0)
    {
        currentSong.src='./songs/'+finalSongs[i-1];
        console.log(currentSong,currentSong.src)
        nextPlay=false;
     console.log("previous song playing ",currentSong)
     currentSong.play();
     playCircleImage.src = "pause.svg"
     console.log(currentSong.src," is playing...")
        break;
    }
    else
    {
        console.log("No previous song in song list.")
    }

   }

   
   if (currentSong) {
    // Define the callback function
    removeEvents();
}
 else{
    return
 }  

})


const next= document.querySelector('.abovebar .playbuttons img:nth-child(3)');

next.addEventListener('click',()=>{
    
    if(currentSong==null)
    {

        console.log("inside next null image ")
        
        let song=songsnames.split('\\');
        
       currentSongPath=song[2]
       currentSong=new Audio('./songs/'+song[2])
       currentSong.play();
       console.log(currentSong.src," is playing...")
       playCircleImage.src = "pause.svg"
       removeEvents();
       return
    }
   
    let songs=songsnames.split('\\')


    let finalSongs=[];

    for(let song of songs )
    {
        if(song.endsWith(".opus"))
        {
            finalSongs.push(song);
            //console.log(song)
        }
    }

      let nextPlay=false;
   for(let i=0;i<finalSongs.length;i++)
   {


    if(finalSongs[i]==currentSongPath && finalSongs.length-1!=i)
    {

    currentSongPath=finalSongs[i+1];
    currentSong.src='./songs/'+finalSongs[i+1];
    console.log("inside next final songs if condition")
     currentSong.play();
     console.log(currentSong.src," is playing...")
     playCircleImage.src = "pause.svg"
        break;
    }

   if(finalSongs.length-1==i)
   {
     prompt("No next song in SOng list.")
   }
   }
   removeEvents()
})



function removeEvents()
{
    if (currentSong) {
        // Define the callback function
        function handleSongEnd() {
            isAudioPlaying = false;
            if(currentSong)
            {
                currentSong.removeEventListener('ended', handleSongEnd);
            }
            currentSong = null; // Reset currentSong when playback ends
            playCircleImage.src = "play-circle.svg";
            console.log("Song finished in playmusic");
        }
         
        // Add the event listener using the callback function
        currentSong.addEventListener('ended', handleSongEnd);
    }
}

let bar = document.querySelector('.seekbar');
document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
   // currentSong.currentTime = ((currentSong.duration) * percent) / 100
   bar.style.backgroundColor = "black"; 

   let newWidth = percent + "%";
   bar.style.background = `linear-gradient(to right, black ${newWidth}, #ccc ${newWidth})`;

})


let circle = document.querySelector('.circle');
if(currentSong){
currentSong.addEventListener('timeupdate', function() {
    let percent = (currentSong.currentTime / currentSong.duration) * 100;
    circle.style.left = percent + "%";
});}
