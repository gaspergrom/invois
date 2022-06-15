import { AuthActions } from '~/store/auth/actions'
import { Routes } from '~/components/shared/constants/routes'
import {API_SERVICE} from "~/components/shared/services/api.service";
import {StoreNamespace} from "~/store";

export default async function ({
  store, redirect
}) {
  const token = API_SERVICE.getToken
  if (token) {
    try {
      const user = await store.dispatch(`${StoreNamespace.AUTH}/${AuthActions.LOAD_USER}`)
      if (user) {
        redirect({ name: Routes.DASHBOARD })
      } else {
        return true
      }
    } catch (err) {
      return true
    }
  } else {
    return true
  }
}
