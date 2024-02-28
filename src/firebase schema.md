users (collection)
│
└── [userId] (document)
    │
    ├── email: "user@example.com"
    │
    └── kids (subcollection)
        │
        ├── [kidId] (document)
        │   ├── name: "Kid Name"
        │   ├── birthDate: "yyyy-mm-dd"
        │   ├── height: number (in cm)
        │   ├── weight: number (in kg)
        │   ├── profileImage: "profile-image/{imageFileName}.jpg"
        │
        └── content (subcollection)
            │
            ├── [year] (document) // Added layer for organizing by year
                │
                └── [contentId] (document)
                    ├── type: "photo/video/recording/note"
                    ├── description: "Content Description"
                    ├── date: "yyyy-mm-dd"
                    ├── path: "content/{year}/{contentType}/{fileName}"
                    ├── tags: ["Event", "Holiday"] // New field for tags


users (directory)
│
└── [userId] (directory)
    │
    └── kids (directory)
        │
        └── [kidId] (directory)
            │
            ├── profile-image (directory)
            │   └── {imageFileName}.jpg
            │
            └── content (directory)
                │
                └── [year] (directory) // Organized by year
                    │
                    ├── photos (directory)
                    │   ├── {photoFileName}.jpg
                    │   └── ...
                    │
                    ├── videos (directory)
                    │   ├── {videoFileName}.mp4
                    │   └── ...
                    │
                    ├── recordings (directory)
                    │   ├── {recordingFileName}.mp3
                    │   └── ...
                    │
                    └── notes (directory)
                        ├── {noteFileName}.txt
                        └── ...
