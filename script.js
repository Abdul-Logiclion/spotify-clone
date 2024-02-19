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
                    console.log(currentSongPath,filename)
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
                });
            
                // Optional: Add event listener for 'error' event to handle any loading errors
                currentSong.addEventListener('error', (error) => {
                    console.error('Error loading audio:', error);
                });
    
                // Update playback flag
    
               // isAudioPlaying = true;
            
                console.log(currentSong,path)
            
                // Now you can use the 'currentSong' variable to control playback or perform any other operations
            }
    
           // console.log("again clicked ")
            if (currentSong) { // Check if currentSong is not null
                // Event listener to reset isAudioPlaying flag and currentSong when audio finishes
        currentSong.addEventListener('ended', () => {
           isAudioPlaying = false;
            currentSong = null; // Reset currentSong when playback ends
           console.log("song finished ")
            // Remove the event listener to prevent multiple registrations
            //currentSong.removeEventListener('ended', arguments.callee);
        });
    }
    
}

     
const playCircleImage = document.querySelector('.abovebar .playbuttons img[src="play-circle.svg"]');

playCircleImage.addEventListener("click", () => {

    if(currentSong==null)
    {

        let song=songsnames.split('\\');
        console.log(song)
        currentSongPath=song[2]
       currentSong=new Audio('./songs/'+song[2])
       currentSong.play();
       playCircleImage.src = "pause.svg"
       console.log(playCircleImage.src)
       return
    }
    else if (currentSong.paused) {
        currentSong.play()
        playCircleImage.src = "pause.svg"
    }
    else {
        currentSong.pause()
        playCircleImage.src = "play-circle.svg"
    }
})

const prev = document.querySelector('.abovebar .playbuttons img[src="previous.svg"]');
prev.addEventListener('click',()=>{
    console.log("inside  previus ")
    if(currentSong==null)
    {

       let song=songsnames.split('\\');
       console.log(song)
       currentSongPath=song[2]
       currentSong=new Audio('./songs/'+song[2])
       currentSong.play();
       playCircleImage.src = "pause.svg"
       console.log(playCircleImage.src)
       return
    }
   
    
    let songs=songsnames.split('\\')
    console.log("after splitting",songs)

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
        console.log("paths and text",finalSongs[i],currentSong,"insdie current song path if condition")
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
        break;
    }
    else
    {
        console.log("No previous song in song list.")
    }

   }
   

})


const next= document.querySelector('.abovebar .playbuttons img[src="next.svg"]');
next.addEventListener('click',()=>{
    
    if(currentSong==null)
    {

        let song=songsnames.split('\\');
        console.log(song)
        currentSongPath=song[2]
       currentSong=new Audio('./songs/'+song[2])
       currentSong.play();
       playCircleImage.src = "pause.svg"
       console.log(playCircleImage.src)
       return
    }
   
    let songs=songsnames.split('\\')
    console.log("after splitting",songs)

    let finalSongs=[];

    for(let song of songs )
    {
        if(song.endsWith(".opus"))
        {
            finalSongs.push(song);
            //console.log(song)
        }
    }

    console.log("before finak next loop",finalSongs)
      let nextPlay=false;
   for(let i=0;i<finalSongs.length;i++)
   {

    //console.log(songName)

    if(finalSongs[i]==currentSongPath)
    {
        console.log("paths and text",finalSongs[i],currentSong,"insdie current song path if condition")
        nextPlay=true;
        continue;
        
    }
    if(nextPlay)
    {
        currentSong.src='./songs/'+finalSongs[i];
        console.log(currentSong,currentSong.src)
        nextPlay=false;
     console.log("next song playing ",currentSong)
     currentSong.play();
        break;
    }

   if(finalSongs.length-1==i)
   {
     prompt("No next song in SOng list.")
   }
   }
   
})

