App.Source.Dot = function( latLng, map, pen )
{
    this.latLng = latLng;
    this.parent = pen;

    this.marker = new google.maps.Marker(
    {
        position: this.latLng,
        map: map
    });

    this.addListener();
}

App.Source.Dot.prototype =
{
    addListener: function()
    {
        var parent = this.parent, marker = this.marker, self = this;

        google.maps.event.addListener( marker, "click", function ()
        {
            parent.setCurrentDot( self );
            parent.draw( marker.getPosition() );
        });
    },

    getLatLng: function()
    {
        return this.latLng;
    },

    getmarker: function()
    {
        return this.marker;
    },

    remove: function()
    {
        this.marker.setMap( null );
    }
};

App.Source.Line = function( dots, map )
{
    this.dots     = dots;
    this.map      = map;
    this.coords   = [];
    this.polyline = null;

    if ( dots.length > 1 )
    {
        for ( var i = 0, ilen = dots.length; i < ilen; i++ )
        {
            this.coords.push( dots[ i ].getLatLng() );
        }

        this.polyline = new google.maps.Polyline(
        {
            map:           this.map,
            path:          this.coords,
            strokeOpacity: 1.0,
            strokeWeight:  2,
            strokeColor:   "#FF0000"
        });
    }

    this.remove = function ()
    {
        this.polyline.setMap( null );
    }
}

App.Source.InfoWindow = function( polygon_obj, map )
{
    this.parent = polygon_obj;
    this.map    = map;
    this.color  = document.createElement( "input" );
    this.button = document.createElement( "input" );
    var self    = this;

    $( this.button ).attr( "type", "button" );
    $( this.button ).val( "Change Color" );

    this.info_window = new google.maps.InfoWindow(
    {
        content: self.getContent()
    });
}

App.Source.InfoWindow.prototype =
{
    changeColor: function()
    {
        this.parent.setColor( $( this.color ).val() );
    },

    getContent: function()
    {
        var content = document.createElement( "div" ), self = this;

        $( this.color ).val( this.parent.getColor() );

        $( this.button ).click( function()
        {
            self.changeColor();
        });

        $( content ).append( this.color );
        $( content ).append( this.button );

        return content;
    },

    show: function( latLng )
    {
        this.info_window.setPosition( latLng );
        this.info_window.open( this.map );
    },

    remove: function()
    {
        this.info_window.close();
    }
};