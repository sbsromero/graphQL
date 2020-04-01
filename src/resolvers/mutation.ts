import {IResolvers} from 'graphql-tools';
import _ from 'lodash';
import { database } from '../data/data.store';
import { cursorTo } from 'readline';

const mutation : IResolvers = {
    Mutation:{
        agregarCurso(__:void, {curso}):any {
            const itemCurso = {
                id: String(database.cursos.length+1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                logo: curso.logo,
                level: curso.level,
                path: curso.path,
                teacher: curso.teacher,
                reviews: []
            }
            if(database.cursos.filter(item => item.title === itemCurso.title).length === 0){
                database.cursos.push(itemCurso);
                return itemCurso;
            }
            return {
                id: '-1',
                title: 'El curso ya se encuentra registrado',
                clases: -1,
                time: 0.0, 
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            };
        },
        modificarCurso(__: void, {curso}) : any {
            const elementoExistente = _.findIndex(database.cursos, function(o){
                return o.id === curso.id;
            });
            if(elementoExistente > -1){
                const valoraciones = database.cursos[elementoExistente].reviews;
                curso.reviews = valoraciones;
                database.cursos[elementoExistente] = curso;
                return curso;
            }
            return{
                id: '-1',
                title: 'El curso no existe en la base de datos',
                description: '',
                clases: '-1',
                time: 0.0,
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            }
        },
        eliminarCurso(__: void, {idCurso}):any{
            const elementoExistente = _.remove(database.cursos, function(curso){
                console.log(curso.id);
                console.log(idCurso);
                return curso.id === idCurso;
            });
            console.log(elementoExistente);
            if(elementoExistente[0] === undefined){
                return{
                    id: '-1',
                    title: 'El curso no existe en la base de datos',
                    description: '',
                    clases: '-1',
                    time: 0.0,
                    level: 'TODOS',
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews: []
                }
            }
            console.log(elementoExistente);
            return elementoExistente[0];
        }
    }
}

export default mutation;