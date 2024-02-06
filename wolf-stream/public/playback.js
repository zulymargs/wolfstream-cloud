
        // JavaScript to retrieve and display the video
        document.addEventListener("DOMContentLoaded", function() {
            const urlParams = new URLSearchParams(window.location.search);
            const videoId = urlParams.get("video_id");

            // Assuming you have a list of videos, you can retrieve the video details
            const videos = [
                { id: 1, title: "Video 1", url: "video1.mp4" },
                { id: 2, title: "Video 2", url: "video2.mp4" },
                // Add details for other videos
            ];

            const video = videos.find(v => v.id === parseInt(videoId, 10));

            if (video) {
                // Create a video player element
                const videoPlayer = document.createElement("video");
                videoPlayer.src = video.url;
                videoPlayer.controls = true;
                videoPlayer.width = "800"; // Set the width as desired
                videoPlayer.height = "450"; // Set the height as desired

                // Display video title
                const videoTitle = document.createElement("h2");
                videoTitle.textContent = video.title;

                // Append the video player and title to the video container
                const videoContainer = document.getElementById("video-container");
                videoContainer.appendChild(videoTitle);
                videoContainer.appendChild(videoPlayer);
            } else {
                // Video not found
                const errorText = document.createElement("p");
                errorText.textContent = "Video not found.";
                document.body.appendChild(errorText);
            }
        });