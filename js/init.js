window.App ? window.App : window.App = { Source: {} };

window.console ? window.console : window.console = { log: function() {} };

App.Source.Init = function()
{
    this.onReady( this );
    this.onReset( this );
    this.onDisplayData( this );
    this.onDisplayColor( this );
};

App.Source.Init.prototype =
{
    onReady: function( self )
    {
        $( document ).ready( function()
        {
            self.data_panel = $( ".b-panel" );

            App.Map     = new App.Source.Map(),
            App.Creator = new App.Source.PolygonCreator( App.Map );
        });
    },

    onReset: function( self )
    {
        $( ".b-reset" ).click(function()
        {
            self.data_panel.empty();
            App.Creator.destroy();
            App.Creator = new App.Source.PolygonCreator( App.Map );
        });
    },

    onDisplayData: function( self )
    {
        var data;

        $( ".b-show-data" ).click(function()
        {
            self.data_panel.empty();

            data = App.Creator.showData();

            data ?
                self.data_panel.append( data ) :
                self.data_panel.append( "Please first create a polygon" );
        });
    },

    onDisplayColor: function( self )
    {
        var color;

        $( ".b-show-color" ).click( function()
        {
            self.data_panel.empty();

            color = App.Creator.showColor();

            color ?
                self.data_panel.append( color ) :
                self.data_panel.append( "Please first create a polygon" );
        });
    }
};

App.Source.Map = function()
{
    this.center = new google.maps.LatLng( 55.7427928, 37.61540089999994 );

    this.opt =
    {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center:    this.center,
        zoom:      15
    };

    this.map_styles =
    [
        { stylers: [ { saturation: -100 } ] },
        { elementType: "labels", stylers: [ { saturation: -100 } ] }
    ];

    this.map = new google.maps.Map( document.getElementById( "b-map" ), this.opt );

    this.map.setOptions( { styles: this.map_styles } );

    return this.map;
};