import {IResolvers} from 'graphql-tools';
import { database } from '../data/data.store';
import _ from 'lodash';

const query : IResolvers = {
    Query: {
        estudiantes() : any{
            return database.estudiantes;
        },
        estudiante(__: void, {id}):any{
            const resultado = database.estudiantes.filter(estudiante => estudiante.id === id)[0];
            if(resultado === undefined){
                return {
                    id: '-1',
                    name: `No se ha encontrado el estudiante con el ID ${id}`,
                    email: '',
                    courses: []
                }
            }
            return resultado;
        },
        cursos() : any{
            return database.cursos;
        },
        curso(__:void, {id}):any{
            const resultado = database.cursos.filter(curso => curso.id === id)[0];
            if(resultado === undefined){
                return{
                    id: '-1',
                    title: `No se ha encontrado el curso con el ID ${id}`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    logo: '',
                    level: 'TODOS',
                    path: '',
                    teacher: '',
                    reviews: []
                }
            }
            return resultado;
        }
    }
}

export default query;