(function () {
    // vue component should be placed before Vue-Parent instance:
    Vue.component("modal-component", {
        // The first argument is a string to use as the name of the component. You use the name as a tag name in your HTML to render the component

        // You don't pass an el to Vue.component because they get rendered in place where their tag is encountered. Rather than an el, you specify a template to use for the component's DOM subtree:
        template: "#modal-template",
        props: ["id"],

        //data you pass to Vue.component must be a function that returns an object:
        data: function () {
            return {
                heading: "Modal Component",
                clickedImageId: "",
                url: "",
                title: "",
                description: "",
                username: "",
                created_at: "",
            };
        },
        mounted: function () {
            console.log("modal-component has loaded");
            console.log("props: ", this.id); // not showing

            var self = this;

            axios.get("/clicked-image/:id", this.id);
            then(function (res) {
                console.log("res inside mounted modal: ", res);
                self.images = res.data[0];
            }).catch(function (err) {
                console.log(`GET" "/clicked-image error:"`, err);
            });
        },
        methods: {
            closeModal: function () {
                console.log("about to emit an even from the component");
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
                    console.log("res inside mounted:", res);
                    self.images = res.data;
                    console.log("self.images = ", res.data);
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
                console.log("clicked ID: ", imageId);
                clickedImageId = imageId;
                this.id = imageId;
            },
        },
    });
})();
