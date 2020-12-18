(function () {
    Vue.component("comments", {
        template: "#comments-section",
        props: ["id"],

        // data: function () {
        //     heading: "Comments Section",
        //     comments: [], // an array of all comments for the image
        //     username: "", // stores the value of the username input field
        //     comment: "", // stores the value of the comment input field
        // },
        mounted: function () {
            // retrieve comments on component mount:
            axios
                .get("/comments" + this.id)
                .then(function (res) {
                    self.comments = res.data.comments;
                    self.username = res.data[0].comments;
                    //    self.comment = res.data[]
                })
                .catch(function (err) {
                    console.log(`axios.get "/comments" failed with: ${err}`);
                });
        },
        methods: {
            submitComment() {
                // insert a comment to DB
                // DONT use formData, instead pass plain JS object as 2nd arg in axios.post
                // upon success, new comment should be added into the arr of comments
            },
        },
    });

    Vue.component("modal-component", {
        template: "#modal-template",
        props: ["id"],

        data: function () {
            return {
                heading: "Modal Component",
                url: "",
                title: "",
                description: "",
                username: "",
                created_at: "",
            };
        },
        mounted: function () {
            console.log(`modal-component mounted for image with ${this.id}`);
            var self = this;
            axios
                .get("/clicked-image/" + this.id)
                .then(function (res) {
                    self.url = res.data[0].url;
                    self.title = res.data[0].title;
                    self.description = res.data[0].description;
                    self.username = res.data[0].username;
                    self.created_at = res.data[0].created_at;
                })
                .catch(function (err) {
                    console.log(
                        ` axios component GET" "/clicked-image error:"`,
                        err
                    );
                });
        },
        methods: {
            closeModal: function () {
                console.log("modal-component emitting close event");
                this.$emit("close");
            },
        },
    });

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
            clickedImageId: null,
        },

        mounted: function () {
            console.log("Component mounted");
            var self = this;
            axios
                .get("/images")
                .then(function (res) {
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

            getId: function (imageId) {
                this.clickedImageId = imageId;
            },

            closeMe: function () {
                console.log("setting clicked ID to null");
                this.clickedImageId = null;
            },
        },
    });
})();
