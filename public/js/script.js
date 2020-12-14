new Vue({
    el: "#main",
    data: {
        name: "Pixels",
        seen: true,
        pictures: [],
    },

    mounted: function () {
        console.log("Vue component mounted");
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
    // methods: {
    //     petesMethod: function (city) {
    //         console.log("Pete's method :) :", city);
    //         console.log("this.cities: ", this.cities);
    //         // change the value of the name on data
    //         this.name = city;
    //     },
    // },
});
