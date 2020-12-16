(function () {
    new Vue({
        el: "#main",
        data: {
            name: "Pixels",
            seen: true,
            images: [],
            title: "",
            uploadedImage: null,
            description: "",
            username: "",
        },

        mounted: function () {
            console.log("Component mounted");
            var self = this;
            axios
                .get("/images")
                .then(function (res) {
                    console.log("res inside mounted:", res);
                    self.images = res.data;
                })
                .catch(function (err) {
                    console.log(`GET '/images':`, err);
                });
        },
        methods: {
            // handling upload on the click "Upload"
            handleOnClickUpload: function (evt) {
                // Prevent the default behavior (i.e navigating to a new page on submitting the form)
                evt.preventDefault();
                console.log("@click: ", evt);

                // 1. Create a FormData instance and append the relevant fields
                var self = this;
                var formData = new FormData();
                formData.append("title", this.title);
                formData.append("description", this.description);
                formData.append("username", this.username);
                formData.append("file", this.uploadedImage);
                // console.log("formData", FormData); // to loop through this special object use for each loop

                // 2. Post the formData to the "/uploads" route with axios
                axios.post("/upload", formData).then(function (res) {
                    console.log(`POST "/upload" completed: `, res);
                    self.images.unshift(res.data);
                });
            },

            handleFileChange: function (evt) {
                // Set the data's "image" property to the newly uploaded file
                this.uploadedImage = evt.target.files[0];
            },
        },
    });
})();
