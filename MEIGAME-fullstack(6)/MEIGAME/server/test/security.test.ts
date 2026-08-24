import {describe,it,expect} from 'vitest';
import {quizSchema,joinSchema,answerSchema} from '../src/validators/schemas.js';
describe('MEIGAME validation',()=>{it('rejects weak quiz titles',()=>expect(()=>quizSchema.parse({title:'x'})).toThrow());it('validates join data',()=>expect(joinSchema.parse({name:'Alex',collegeId:'MEC001'}).name).toBe('Alex'));it('rejects empty answer ids',()=>expect(()=>answerSchema.parse({questionId:'',selectedOptionId:'a'})).toThrow())});
