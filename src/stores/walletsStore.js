import {observable, action, computed} from 'mobx';
import agent from '../agent';

const LIMIT = 10;

export class WalletsStore {
    @observable isLoading = false;
    @observable page = 0;
    @observable totalPagesCount = 0;
    @observable walletsRegistry = observable.map();
    @observable predicate = {};

    @computed get wallets() {
        return this.walletsRegistry.values();
    };

    @action setPredicate(predicate) {
        if (JSON.stringify(predicate) === JSON.stringify(this.predicate)) return;
        this.clear();
        this.predicate = predicate;
    }

    $req() {
        // if (this.predicate.myFeed) return agent.Articles.feed(this.page, LIMIT);
        // if (this.predicate.favoritedBy) return agent.Articles.favoritedBy(this.predicate.favoritedBy, this.page, LIMIT);
        // if (this.predicate.tag) return agent.Articles.byTag(this.predicate.tag, this.page, LIMIT);
        // if (this.predicate.author) return agent.Articles.byAuthor(this.predicate.author, this.page, LIMIT);
        return agent.Wallets.all(this.page, LIMIT, this.predicate);
    }

    @action loadWallets() {
        this.isLoading = true;
        return this.$req()
            .then(action(({wallets, walletsCount}) => {
                this.walletsRegistry.clear();
                wallets.forEach(wallet => this.walletsRegistry.set(wallet.walletName, wallet));
                this.totalPagesCount = Math.ceil(walletsCount / LIMIT);
            }))
            .finally(action(() => {
                this.isLoading = false;
            }));
    }

    @action
    async createWallet() {
        this.isLoading = true;
        return await agent.Wallets.createWallet()
    }

}

export default new WalletsStore();
