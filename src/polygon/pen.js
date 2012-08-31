App.Source.Pen = function( map )
{
    this.map         = map;
    this.dots        = [];
    this.current_dot = null;
    this.polyline    = null;
    this.polygon     = null;
}

App.Source.Pen.prototype =
{
    draw: function( latLng )
    {
        if ( this.polygon )
        {
            alert( "Click Reset to draw another" );
            return false;
        }

        if ( this.current_dot && this.dots.length > 1 && 
             this.current_dot === this.dots[ 0 ] )
        {
            this.drawPolygon( this.dots );
        }
        else
        {
            if ( this.polyline )
            {
                this.polyline.remove();
            }

            var dot = new App.Source.Dot( latLng, this.map, this );

            this.dots.push( dot );

            if ( this.dots.length > 1 )
            {
                this.polyline = new App.Source.Line( this.dots, this.map );
            }
        }
    },

    drawPolygon: function( dots )
    {
        this.polygon = new App.Source.Polygon( dots, this.map, this );
        this.deleteMis();
    },

    deleteMis: function()
    {
        $.each( this.dots, function( index, value )
        {
            value.remove();
        });

        this.dots.length = 0;

        if ( this.polyline )
        {
            this.polyline.remove();
            this.polyline = null;
        }
    },

    setCurrentDot: function( dot )
    {
        this.current_dot = dot;
    },

    getData: function()
    {
        if ( this.polygon )
        {
            var data = "", paths = this.polygon.getPlots();

            paths.getAt( 0 ).forEach( function ( value, index )
            {
                data += ( value.toString() );
            });

            return data;
        }
        else
        {
            return null;
        }
    },

    getColor: function()
    {
        var result = this.polygon ? this.polygon.getColor() : null;

        return result;
    }
};