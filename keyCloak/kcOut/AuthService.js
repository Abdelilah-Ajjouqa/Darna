"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCloackService = void 0;
const keycloak_URL = process.env.KEYCLOAK_URL;
const keycloak_Realm = process.env.KEYCLOAK_REALM;
const keycloak_user = process.env.KEYCLOAK_USER;
const keycloak_password = process.env.KEYCLOAK_PASSWORD;
class KeyCloackService {
    //this one is to gernerate usble keycloack token for SSO managment
    static async getAdminToken() {
        const url = `${keycloak_URL}/realms/master/protocol/openid-connect/token`;
        const params = {
            grant_type: "password",
            client_id: "admin-cli",
            username: keycloak_user,
            password: keycloak_password,
        };
        const body = new URLSearchParams(params).toString();
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
        });
        if (!res.ok)
            throw new Error("faild to fetch Admin Token\n" + res.statusText);
        const data = await res.json();
        return data.access_token;
    }
    //welp for this one the function name says waht it does
    static async registerUser({ username, email, password, firstName, lastName, }) {
        const kcToken = await this.getAdminToken();
        const payload = {
            username,
            email,
            enabled: true,
            firstName,
            lastName,
            credentials: [{ type: "password", value: password, temporary: false }],
        };
        const res = await fetch(`${keycloak_URL}/admin/realms/${keycloak_Realm}/users`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${kcToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const msg = await res.text();
            throw new Error(`Failed to create user: ${res.status} ${msg}`);
        }
    }
}
exports.KeyCloackService = KeyCloackService;
