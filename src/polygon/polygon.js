App.Source.Polygon = function( dots, map, pen )
{
    this.dots   = dots;
    this.map    = map;
    this.parent = pen;
    this.coords = [];

    for ( var i = 0, ilen = dots.length; i < ilen; i++ )
    {
        this.coords.push( dots[ i ].getLatLng() );
    }

    this.polygon = new google.maps.Polygon(
    {
        paths: this.coords,
        map:   this.map
    });
    
    this.polygon.setOptions( this.mouseout_style );

    this.info_window = new App.Source.InfoWindow( this, this.map );

    this.addListener();
}

App.Source.Polygon.prototype =
{
    remove: function()
    {
        this.info_window.remove();
        this.polygon.setMap( null );
    },

    getPlots: function()
    {
        return this.polygon.getPaths();
    },

    getColor: function()
    {
        return this.polygon.fillColor;
    },

    setColor: function( color )
    {
        return this.polygon.setOptions(
        {
            fillColor:    color,
            strokeColor:  color,
            strokeWeight: 2
        });
    },

    addListener: function()
    {
        var self = this, info = this.info_window, polygon = this.polygon;

        google.maps.event.addListener( polygon, "click", function( event )
        {
            info.show( event.latLng );
        });

        google.maps.event.addListener( polygon, "mouseover", function( event )
        {
            polygon.setOptions( self.mouseover_style );
        });

        google.maps.event.addListener( polygon, "mouseout", function( event )
        {
            polygon.setOptions( self.mouseout_style );
        });
    },

    mouseover_style:
    {
        strokeColor:   "#FF0000",
        fillColor:     "#FF0000",
        fillOpacity:   0.35,
        strokeOpacity: 0.8,
        strokeWeight:  2
    },

    mouseout_style:
    {
        strokeColor:   "#e82d2d",
        fillColor:     "#e82d2d",
        fillOpacity:   0.35,
        strokeOpacity: 0.8,
        strokeWeight:  2
    }
};