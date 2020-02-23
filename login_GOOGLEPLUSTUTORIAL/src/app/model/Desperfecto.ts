export interface Desperfecto{
    id_desperfecto: number | string;
    id_usuario_fk:  number | string;
    latitud:  number | string;
    longitud:  number | string;
    descripcion: string;
    foto?: string;
    fecha? :string;
 
}