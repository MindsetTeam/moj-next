import nc from 'next-connect';
import database from '@/middlewares/database'
import {protect} from '@/middlewares/auth'
import {updateUserBasicInfo} from 'controllers/users'
import { ncOpts } from 'api-lib/nc';

const handler = nc(ncOpts);
handler.use(database)

handler.put(protect, updateUserBasicInfo)

export default handler;