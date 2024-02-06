// Load the video data from the JSON file in the "data" folder
fetch('././data/videos.json')  // Use '../' to go up one level to the "data" folder
    .then(response => response.json())
    .then(data => {
        // Check if the "videos" key exists in the JSON data
        if (data.videos) {
            const videoData = data.videos;

            // Get the container where the videos will be displayed
            const videoContainer = document.querySelector('.grid-videos');

            // Loop through the video data and create HTML elements for each video
            for (const videoId in videoData) {
                const video = videoData[videoId];

                // Create a video element
                const videoElement = document.createElement('video');
                videoElement.src = video.src;
                videoElement.classList.add('video');
                videoElement.setAttribute('controls', true);
                videoElement.textContent = video.title;

                // Create an anchor element for the video link
                const videoLink = document.createElement('a');
                videoLink.href = `playback.html?video_id=${videoId}`;
                videoLink.appendChild(videoElement);

                // Append the video link to the video container
                videoContainer.appendChild(videoLink);
            }
        } else {
            console.error('No "videos" key found in the JSON data.');
        }
    })
    .catch(error => console.error('Error loading video data: ', error));