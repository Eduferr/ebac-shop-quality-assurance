import { $ } from '@wdio/globals'

class ProfilePage {

    async ProfileName(name){
        return await $(`//android.widget.TextView[@text="${name}"]`) //usando xPath
    }
}
export default new ProfilePage();
