class Home {
    constructor(canvas_id) {
        this.ctx = this._set_context(canvas_id);
        this._set_shaders("vertexShader", "fragmentShader");
        this.draw_home();
    }

    _set_context(id){
    // Gets the webGL context, and sets the clean black canvas.
        let canvas = document.getElementById(id);
        var gl = canvas.getContext("webgl");
        if (!gl) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
        gl.clearColor(0.0, 0.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        return gl;
    }


    _set_shaders(vertex_id, fragment_id){

            // Create a vertex shader object and a fragment shader object.
        let vertex = document.getElementById(vertex_id).innerHTML;
        let fragment = document.getElementById(fragment_id).innerHTML; 
        
        var vertex_shader = this.ctx.createShader(this.ctx.VERTEX_SHADER);
        this.ctx.shaderSource(vertex_shader, vertex);
        this.ctx.compileShader(vertex_shader);
        if (!this.ctx.getShaderParameter(vertex_shader, this.ctx.COMPILE_STATUS)) {
            alert("Error compiling shader: " + this.ctx.getShaderInfoLog(vertex_shader));
            return;
        }
        var fragment_shader = this.ctx.createShader(this.ctx.FRAGMENT_SHADER);
        this.ctx.shaderSource(fragment_shader, fragment);
        this.ctx.compileShader(fragment_shader);
        if (!this.ctx.getShaderParameter(fragment_shader, this.ctx.COMPILE_STATUS)) {
            alert("Error compiling shader: " + this.ctx.getShaderInfoLog(fragment_shader));
            return;
        }
        // Create a program object
        let program = this.ctx.createProgram();
        this.ctx.attachShader(program, vertex_shader);
        this.ctx.attachShader(program, fragment_shader);
        this.ctx.linkProgram(program);
        this.ctx.useProgram(program);
        this.ctx.program = program;
        return true;
    }


    _set_rooftop() {
        // Draws the rooftop.
        let roof = [
            1.0, -1.0, 0,
            1.0, 1.0, 0,
            1.5, 0, 0
        ];
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
        this.ctx.drawArrays(
            this.ctx.TRIANGLES, 0, 
            this._set_Buffer(roof)
        );
    
    }

    _set_foundation() {

    }

    _set_Buffer(points){
    let dim = 3;
    var vert = new Float32Array(points);

    var buffer = this.ctx.createBuffer();
    if (!buffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, buffer);
    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, vert, this.ctx.STATIC_DRAW);

    // Assign the vertices in buffer object to gl_Position variable
    var gl_Position = this.ctx.getAttribLocation(this.ctx.program, "a_Position");
    
    if (gl_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    this.ctx.vertexAttribPointer(gl_Position, dim, this.ctx.FLOAT, false, 0, 0);
    this.ctx.enableVertexAttribArray(gl_Position);
    

    // Return number of vertices
    return vert.length / dim;
}

draw_home() {
    // Draws the home.
    this._set_rooftop();
    //this._set_foundation();
}


    




}
function init() {
    home = new Home("Canvas");
}




init();


