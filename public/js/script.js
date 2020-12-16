new Vue({
    el: "#main",
    data: {
        name: "Pixels",
        seen: true,
        images: [],
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
    // methods: {
    //     petesMethod: function (city) {
    //         console.log("Pete's method :) :", city);
    //         console.log("this.cities: ", this.cities);
    //         // change the value of the name on data
    //         this.name = city;
    //     },
    // },
});

new Vue({
    el: "#uploader",
    data: {
        title: "",
        image: null,
        description,
    },
    methods: {
        //@change is the
        handleFileChange: function (e) {
            // Set the data's "image" property to the newly uploaded file
            this.image = e.target.files[0];
        },
        upload: function (e) {
            // Prevent the default behavior (i.e navigating to a new page on submitting the form)
            e.preventDefault();

            // TODO:
            // 1. Create a FormData instance and append the relevant fields
            // 2. Post the form data to the "/uploads" route with axios
        },
    },
});
