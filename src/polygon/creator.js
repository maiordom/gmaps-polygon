App.Source.PolygonCreator = function( map )
{
    this.map = map;
    this.pen = new App.Source.Pen( this.map );

    this.onClick();
}

App.Source.PolygonCreator.prototype =
{
    onClick: function()
    {
        var self = this;

        this.event = google.maps.event.addListener( self.map, "click", function ( event )
        {
            self.pen.draw( event.latLng );
        });
    },

    showData: function()
    {
        return this.pen.getData();
    },

    showColor: function()
    {
        return this.pen.getColor();
    },

    destroy: function()
    {
        this.pen.deleteMis();

        if ( this.pen.polygon )
        {
            this.pen.polygon.remove();
        }

        google.maps.event.removeListener( this.event );
    }
};