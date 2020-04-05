export default {
    results: [
        {
            _meta: {
                label: "admin.LogEntry",
                app_label: "admin",
                model_name: "logentry",
                object_name: "LogEntry",
                db_table: "django_admin_log",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "auth.Permission",
                app_label: "auth",
                model_name: "permission",
                object_name: "Permission",
                db_table: "auth_permission",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "auth.Group_permissions",
                app_label: "auth",
                model_name: "group_permissions",
                object_name: "Group_permissions",
                db_table: "auth_group_permissions",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: "<class 'django.contrib.auth.models.Group'>",
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "auth.Group",
                app_label: "auth",
                model_name: "group",
                object_name: "Group",
                db_table: "auth_group",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "contenttypes.ContentType",
                app_label: "contenttypes",
                model_name: "contenttype",
                object_name: "ContentType",
                db_table: "django_content_type",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "sessions.Session",
                app_label: "sessions",
                model_name: "session",
                object_name: "Session",
                db_table: "django_session",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "session_key",
                    verbose_name: "session key"
                }
            }
        },
        {
            _meta: {
                label: "authtoken.Token",
                app_label: "authtoken",
                model_name: "token",
                object_name: "Token",
                db_table: "authtoken_token",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "key",
                    verbose_name: "Key"
                }
            }
        },
        {
            _meta: {
                label: "django_drf_filepond.TemporaryUpload",
                app_label: "django_drf_filepond",
                model_name: "temporaryupload",
                object_name: "TemporaryUpload",
                db_table: "django_drf_filepond_temporaryupload",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "upload_id",
                    verbose_name: "upload id"
                }
            }
        },
        {
            _meta: {
                label: "django_drf_filepond.StoredUpload",
                app_label: "django_drf_filepond",
                model_name: "storedupload",
                object_name: "StoredUpload",
                db_table: "django_drf_filepond_storedupload",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "upload_id",
                    verbose_name: "upload id"
                }
            }
        },
        {
            _meta: {
                label: "push_notifications.GCMDevice",
                app_label: "push_notifications",
                model_name: "gcmdevice",
                object_name: "GCMDevice",
                db_table: "push_notifications_gcmdevice",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "push_notifications.APNSDevice",
                app_label: "push_notifications",
                model_name: "apnsdevice",
                object_name: "APNSDevice",
                db_table: "push_notifications_apnsdevice",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "push_notifications.WNSDevice",
                app_label: "push_notifications",
                model_name: "wnsdevice",
                object_name: "WNSDevice",
                db_table: "push_notifications_wnsdevice",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "push_notifications.WebPushDevice",
                app_label: "push_notifications",
                model_name: "webpushdevice",
                object_name: "WebPushDevice",
                db_table: "push_notifications_webpushdevice",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "django_celery_beat.SolarSchedule",
                app_label: "django_celery_beat",
                model_name: "solarschedule",
                object_name: "SolarSchedule",
                db_table: "django_celery_beat_solarschedule",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "django_celery_beat.IntervalSchedule",
                app_label: "django_celery_beat",
                model_name: "intervalschedule",
                object_name: "IntervalSchedule",
                db_table: "django_celery_beat_intervalschedule",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "django_celery_beat.ClockedSchedule",
                app_label: "django_celery_beat",
                model_name: "clockedschedule",
                object_name: "ClockedSchedule",
                db_table: "django_celery_beat_clockedschedule",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "django_celery_beat.CrontabSchedule",
                app_label: "django_celery_beat",
                model_name: "crontabschedule",
                object_name: "CrontabSchedule",
                db_table: "django_celery_beat_crontabschedule",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "django_celery_beat.PeriodicTasks",
                app_label: "django_celery_beat",
                model_name: "periodictasks",
                object_name: "PeriodicTasks",
                db_table: "django_celery_beat_periodictasks",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "ident",
                    verbose_name: "ident"
                }
            }
        },
        {
            _meta: {
                label: "django_celery_beat.PeriodicTask",
                app_label: "django_celery_beat",
                model_name: "periodictask",
                object_name: "PeriodicTask",
                db_table: "django_celery_beat_periodictask",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "report_builder.Report_starred",
                app_label: "report_builder",
                model_name: "report_starred",
                object_name: "Report_starred",
                db_table: "report_builder_report_starred",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: "<class 'report_builder.models.Report'>",
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "report_builder.Report",
                app_label: "report_builder",
                model_name: "report",
                object_name: "Report",
                db_table: "report_builder_report",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "report_builder.Format",
                app_label: "report_builder",
                model_name: "format",
                object_name: "Format",
                db_table: "report_builder_format",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "report_builder.DisplayField",
                app_label: "report_builder",
                model_name: "displayfield",
                object_name: "DisplayField",
                db_table: "report_builder_displayfield",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "report_builder.FilterField",
                app_label: "report_builder",
                model_name: "filterfield",
                object_name: "FilterField",
                db_table: "report_builder_filterfield",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "report_builder_scheduled.ScheduledReport_users",
                app_label: "report_builder_scheduled",
                model_name: "scheduledreport_users",
                object_name: "ScheduledReport_users",
                db_table: "report_builder_scheduled_scheduledreport_users",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: "<class 'report_builder_scheduled.models.ScheduledReport'>",
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "report_builder_scheduled.ScheduledReport",
                app_label: "report_builder_scheduled",
                model_name: "scheduledreport",
                object_name: "ScheduledReport",
                db_table: "report_builder_scheduled_scheduledreport",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "areion_extension.PhoneToken",
                app_label: "areion_extension",
                model_name: "phonetoken",
                object_name: "PhoneToken",
                db_table: "areion_extension_phonetoken",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.ApprovalCycle",
                app_label: "areion_backbone",
                model_name: "approvalcycle",
                object_name: "ApprovalCycle",
                db_table: "areion_backbone_approvalcycle",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.ApprovalCycleAction",
                app_label: "areion_backbone",
                model_name: "approvalcycleaction",
                object_name: "ApprovalCycleAction",
                db_table: "areion_backbone_approvalcycleaction",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.ApprovalCycleLevel",
                app_label: "areion_backbone",
                model_name: "approvalcyclelevel",
                object_name: "ApprovalCycleLevel",
                db_table: "areion_backbone_approvalcyclelevel",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.EnumEntity",
                app_label: "areion_backbone",
                model_name: "enumentity",
                object_name: "EnumEntity",
                db_table: "areion_backbone_enumentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.GeoEntity",
                app_label: "areion_backbone",
                model_name: "geoentity",
                object_name: "GeoEntity",
                db_table: "areion_backbone_geoentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.OrganizationEntity",
                app_label: "areion_backbone",
                model_name: "organizationentity",
                object_name: "OrganizationEntity",
                db_table: "areion_backbone_organizationentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.UserGroup_attributes",
                app_label: "areion_backbone",
                model_name: "usergroup_attributes",
                object_name: "UserGroup_attributes",
                db_table: "areion_backbone_usergroup_attributes",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: "<class 'areion.areion_backbone.models.groups.user_group.UserGroup'>",
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.UserGroup",
                app_label: "areion_backbone",
                model_name: "usergroup",
                object_name: "UserGroup",
                db_table: "areion_backbone_usergroup",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.UserEntity_groups",
                app_label: "areion_backbone",
                model_name: "userentity_groups",
                object_name: "UserEntity_groups",
                db_table: "areion_backbone_userentity_groups",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: "<class 'areion.areion_backbone.models.entities.user_entity.UserEntity'>",
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.UserEntity_user_permissions",
                app_label: "areion_backbone",
                model_name: "userentity_user_permissions",
                object_name: "UserEntity_user_permissions",
                db_table: "areion_backbone_userentity_user_permissions",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: "<class 'areion.areion_backbone.models.entities.user_entity.UserEntity'>",
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.UserEntity",
                app_label: "areion_backbone",
                model_name: "userentity",
                object_name: "UserEntity",
                db_table: "areion_backbone_userentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.FileEntity",
                app_label: "areion_backbone",
                model_name: "fileentity",
                object_name: "FileEntity",
                db_table: "areion_backbone_fileentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.ImageFileEntity",
                app_label: "areion_backbone",
                model_name: "imagefileentity",
                object_name: "ImageFileEntity",
                db_table: "areion_backbone_fileentity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.EnumGroup",
                app_label: "areion_backbone",
                model_name: "enumgroup",
                object_name: "EnumGroup",
                db_table: "areion_backbone_enumgroup",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.GeoGroup",
                app_label: "areion_backbone",
                model_name: "geogroup",
                object_name: "GeoGroup",
                db_table: "areion_backbone_geogroup",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.OrganizationGroup",
                app_label: "areion_backbone",
                model_name: "organizationgroup",
                object_name: "OrganizationGroup",
                db_table: "areion_backbone_organizationgroup",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.ErrorLog",
                app_label: "areion_backbone",
                model_name: "errorlog",
                object_name: "ErrorLog",
                db_table: "areion_backbone_errorlog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.CreateLog",
                app_label: "areion_backbone",
                model_name: "createlog",
                object_name: "CreateLog",
                db_table: "areion_backbone_createlog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.DeleteLog",
                app_label: "areion_backbone",
                model_name: "deletelog",
                object_name: "DeleteLog",
                db_table: "areion_backbone_deletelog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.RestoreLog",
                app_label: "areion_backbone",
                model_name: "restorelog",
                object_name: "RestoreLog",
                db_table: "areion_backbone_restorelog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.UpdateLog",
                app_label: "areion_backbone",
                model_name: "updatelog",
                object_name: "UpdateLog",
                db_table: "areion_backbone_updatelog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.ApiLog",
                app_label: "areion_backbone",
                model_name: "apilog",
                object_name: "ApiLog",
                db_table: "areion_backbone_apilog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.EmailLog",
                app_label: "areion_backbone",
                model_name: "emaillog",
                object_name: "EmailLog",
                db_table: "areion_backbone_emaillog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.LoginLog",
                app_label: "areion_backbone",
                model_name: "loginlog",
                object_name: "LoginLog",
                db_table: "areion_backbone_apilog",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.SignUpLog",
                app_label: "areion_backbone",
                model_name: "signuplog",
                object_name: "SignUpLog",
                db_table: "areion_backbone_apilog",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.UserAttribute",
                app_label: "areion_backbone",
                model_name: "userattribute",
                object_name: "UserAttribute",
                db_table: "areion_backbone_userattribute",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.UserAttributeValue",
                app_label: "areion_backbone",
                model_name: "userattributevalue",
                object_name: "UserAttributeValue",
                db_table: "areion_backbone_userattributevalue",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.PermissionAssignment",
                app_label: "areion_backbone",
                model_name: "permissionassignment",
                object_name: "PermissionAssignment",
                db_table: "areion_backbone_permissionassignment",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.PermissionEntity",
                app_label: "areion_backbone",
                model_name: "permissionentity",
                object_name: "PermissionEntity",
                db_table: "areion_backbone_permissionentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.GeoAddress",
                app_label: "areion_backbone",
                model_name: "geoaddress",
                object_name: "GeoAddress",
                db_table: "areion_backbone_geoaddress",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_backbone.GeoLocation",
                app_label: "areion_backbone",
                model_name: "geolocation",
                object_name: "GeoLocation",
                db_table: "areion_backbone_geolocation",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_fcm.FCMLog",
                app_label: "areion_fcm",
                model_name: "fcmlog",
                object_name: "FCMLog",
                db_table: "areion_fcm_fcmlog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_fcm.FCMDevice",
                app_label: "areion_fcm",
                model_name: "fcmdevice",
                object_name: "FCMDevice",
                db_table: "areion_fcm_fcmdevice",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_notify.Notification",
                app_label: "areion_notify",
                model_name: "notification",
                object_name: "Notification",
                db_table: "areion_notify_notification",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "areion_service.TaskLog",
                app_label: "areion_service",
                model_name: "tasklog",
                object_name: "TaskLog",
                db_table: "areion_service_tasklog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "africastalking.AfricasTalkingCallLog",
                app_label: "africastalking",
                model_name: "africastalkingcalllog",
                object_name: "AfricasTalkingCallLog",
                db_table: "africastalking_africastalkingcalllog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.QuestionEntity",
                app_label: "survey_backbone",
                model_name: "questionentity",
                object_name: "QuestionEntity",
                db_table: "survey_backbone_questionentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.CampaignEntity",
                app_label: "survey_backbone",
                model_name: "campaignentity",
                object_name: "CampaignEntity",
                db_table: "survey_backbone_campaignentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.ApprovedCampaign",
                app_label: "survey_backbone",
                model_name: "approvedcampaign",
                object_name: "ApprovedCampaign",
                db_table: "survey_backbone_campaignentity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.CompletedCampaign",
                app_label: "survey_backbone",
                model_name: "completedcampaign",
                object_name: "CompletedCampaign",
                db_table: "survey_backbone_campaignentity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.ActiveCampaign",
                app_label: "survey_backbone",
                model_name: "activecampaign",
                object_name: "ActiveCampaign",
                db_table: "survey_backbone_campaignentity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.PendingCampaign",
                app_label: "survey_backbone",
                model_name: "pendingcampaign",
                object_name: "PendingCampaign",
                db_table: "survey_backbone_campaignentity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.RejectedCampaign",
                app_label: "survey_backbone",
                model_name: "rejectedcampaign",
                object_name: "RejectedCampaign",
                db_table: "survey_backbone_campaignentity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.CampaignFilter",
                app_label: "survey_backbone",
                model_name: "campaignfilter",
                object_name: "CampaignFilter",
                db_table: "survey_backbone_campaignfilter",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.CampaignTransaction",
                app_label: "survey_backbone",
                model_name: "campaigntransaction",
                object_name: "CampaignTransaction",
                db_table: "survey_backbone_campaigntransaction",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.ProfileRelatedEntity",
                app_label: "survey_backbone",
                model_name: "profilerelatedentity",
                object_name: "ProfileRelatedEntity",
                db_table: "survey_backbone_profilerelatedentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.ProfileRelationEntity",
                app_label: "survey_backbone",
                model_name: "profilerelationentity",
                object_name: "ProfileRelationEntity",
                db_table: "survey_backbone_profilerelationentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.QuestionResponseEntity",
                app_label: "survey_backbone",
                model_name: "questionresponseentity",
                object_name: "QuestionResponseEntity",
                db_table: "survey_backbone_questionresponseentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.SurveyEntity",
                app_label: "survey_backbone",
                model_name: "surveyentity",
                object_name: "SurveyEntity",
                db_table: "survey_backbone_surveyentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.SurveyResponseEntity",
                app_label: "survey_backbone",
                model_name: "surveyresponseentity",
                object_name: "SurveyResponseEntity",
                db_table: "survey_backbone_surveyresponseentity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.QuestionGroup",
                app_label: "survey_backbone",
                model_name: "questiongroup",
                object_name: "QuestionGroup",
                db_table: "survey_backbone_questiongroup",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.PrivateSurveyEntity",
                app_label: "survey_backbone",
                model_name: "privatesurveyentity",
                object_name: "PrivateSurveyEntity",
                db_table: "survey_backbone_surveyentity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.ProfileQuestionGroup",
                app_label: "survey_backbone",
                model_name: "profilequestiongroup",
                object_name: "ProfileQuestionGroup",
                db_table: "survey_backbone_questiongroup",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.SponsoredQuestionGroup",
                app_label: "survey_backbone",
                model_name: "sponsoredquestiongroup",
                object_name: "SponsoredQuestionGroup",
                db_table: "survey_backbone_questiongroup",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.ProfileQuestionEntity",
                app_label: "survey_backbone",
                model_name: "profilequestionentity",
                object_name: "ProfileQuestionEntity",
                db_table: "survey_backbone_questionentity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.SponsoredQuestionEntity",
                app_label: "survey_backbone",
                model_name: "sponsoredquestionentity",
                object_name: "SponsoredQuestionEntity",
                db_table: "survey_backbone_questionentity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_backbone.PrivateSurveyGroup",
                app_label: "survey_backbone",
                model_name: "privatesurveygroup",
                object_name: "PrivateSurveyGroup",
                db_table: "survey_backbone_questiongroup",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.PenaltyRequest",
                app_label: "survey_reward",
                model_name: "penaltyrequest",
                object_name: "PenaltyRequest",
                db_table: "survey_reward_penaltyrequest",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.AcceptedPenaltyRequest",
                app_label: "survey_reward",
                model_name: "acceptedpenaltyrequest",
                object_name: "AcceptedPenaltyRequest",
                db_table: "survey_reward_penaltyrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.ClosedPenaltyRequest",
                app_label: "survey_reward",
                model_name: "closedpenaltyrequest",
                object_name: "ClosedPenaltyRequest",
                db_table: "survey_reward_penaltyrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.PendingPenaltyRequest",
                app_label: "survey_reward",
                model_name: "pendingpenaltyrequest",
                object_name: "PendingPenaltyRequest",
                db_table: "survey_reward_penaltyrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.RejectedPenaltyRequest",
                app_label: "survey_reward",
                model_name: "rejectedpenaltyrequest",
                object_name: "RejectedPenaltyRequest",
                db_table: "survey_reward_penaltyrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.RechargeRequest",
                app_label: "survey_reward",
                model_name: "rechargerequest",
                object_name: "RechargeRequest",
                db_table: "survey_reward_rechargerequest",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.AcceptedRechargeRequest",
                app_label: "survey_reward",
                model_name: "acceptedrechargerequest",
                object_name: "AcceptedRechargeRequest",
                db_table: "survey_reward_rechargerequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.ClosedRechargeRequest",
                app_label: "survey_reward",
                model_name: "closedrechargerequest",
                object_name: "ClosedRechargeRequest",
                db_table: "survey_reward_rechargerequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.PendingRechargeRequest",
                app_label: "survey_reward",
                model_name: "pendingrechargerequest",
                object_name: "PendingRechargeRequest",
                db_table: "survey_reward_rechargerequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.RejectedRechargeRequest",
                app_label: "survey_reward",
                model_name: "rejectedrechargerequest",
                object_name: "RejectedRechargeRequest",
                db_table: "survey_reward_rechargerequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.DisburseStatus",
                app_label: "survey_reward",
                model_name: "disbursestatus",
                object_name: "DisburseStatus",
                db_table: "survey_reward_disbursestatus",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.RedeemEntity",
                app_label: "survey_reward",
                model_name: "redeementity",
                object_name: "RedeemEntity",
                db_table: "survey_reward_redeementity",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.ActiveRedeemEntity",
                app_label: "survey_reward",
                model_name: "activeredeementity",
                object_name: "ActiveRedeemEntity",
                db_table: "survey_reward_redeementity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.DisabledRedeemEntity",
                app_label: "survey_reward",
                model_name: "disabledredeementity",
                object_name: "DisabledRedeemEntity",
                db_table: "survey_reward_redeementity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.DraftRedeemEntity",
                app_label: "survey_reward",
                model_name: "draftredeementity",
                object_name: "DraftRedeemEntity",
                db_table: "survey_reward_redeementity",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.RedeemRequest",
                app_label: "survey_reward",
                model_name: "redeemrequest",
                object_name: "RedeemRequest",
                db_table: "survey_reward_redeemrequest",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.ApprovedRedeemRequest",
                app_label: "survey_reward",
                model_name: "approvedredeemrequest",
                object_name: "ApprovedRedeemRequest",
                db_table: "survey_reward_redeemrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.ClosedRedeemRequest",
                app_label: "survey_reward",
                model_name: "closedredeemrequest",
                object_name: "ClosedRedeemRequest",
                db_table: "survey_reward_redeemrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.DisbursedRedeemRequest",
                app_label: "survey_reward",
                model_name: "disbursedredeemrequest",
                object_name: "DisbursedRedeemRequest",
                db_table: "survey_reward_redeemrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.PendingRedeemRequest",
                app_label: "survey_reward",
                model_name: "pendingredeemrequest",
                object_name: "PendingRedeemRequest",
                db_table: "survey_reward_redeemrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.RejectedRedeemRequest",
                app_label: "survey_reward",
                model_name: "rejectedredeemrequest",
                object_name: "RejectedRedeemRequest",
                db_table: "survey_reward_redeemrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.UserCurrency",
                app_label: "survey_reward",
                model_name: "usercurrency",
                object_name: "UserCurrency",
                db_table: "survey_reward_usercurrency",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.UserCurrencyLog",
                app_label: "survey_reward",
                model_name: "usercurrencylog",
                object_name: "UserCurrencyLog",
                db_table: "survey_reward_usercurrencylog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.UserReferralReward",
                app_label: "survey_reward",
                model_name: "userreferralreward",
                object_name: "UserReferralReward",
                db_table: "survey_reward_userreferralreward",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.UserReward",
                app_label: "survey_reward",
                model_name: "userreward",
                object_name: "UserReward",
                db_table: "survey_reward_userreward",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.UserRewardLog",
                app_label: "survey_reward",
                model_name: "userrewardlog",
                object_name: "UserRewardLog",
                db_table: "survey_reward_userrewardlog",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.SMSRequest",
                app_label: "survey_reward",
                model_name: "smsrequest",
                object_name: "SMSRequest",
                db_table: "survey_reward_smsrequest",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.DirectSponsorRequest",
                app_label: "survey_reward",
                model_name: "directsponsorrequest",
                object_name: "DirectSponsorRequest",
                db_table: "survey_reward_directsponsorrequest",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.ApprovedDirectSponsorRequest",
                app_label: "survey_reward",
                model_name: "approveddirectsponsorrequest",
                object_name: "ApprovedDirectSponsorRequest",
                db_table: "survey_reward_directsponsorrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.ClosedDirectSponsorRequest",
                app_label: "survey_reward",
                model_name: "closeddirectsponsorrequest",
                object_name: "ClosedDirectSponsorRequest",
                db_table: "survey_reward_directsponsorrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.PendingDirectSponsorRequest",
                app_label: "survey_reward",
                model_name: "pendingdirectsponsorrequest",
                object_name: "PendingDirectSponsorRequest",
                db_table: "survey_reward_directsponsorrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.RejectedDirectSponsorRequest",
                app_label: "survey_reward",
                model_name: "rejecteddirectsponsorrequest",
                object_name: "RejectedDirectSponsorRequest",
                db_table: "survey_reward_directsponsorrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.DirectSponsorDocument",
                app_label: "survey_reward",
                model_name: "directsponsordocument",
                object_name: "DirectSponsorDocument",
                db_table: "survey_reward_directsponsordocument",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.DirectSponsorAction",
                app_label: "survey_reward",
                model_name: "directsponsoraction",
                object_name: "DirectSponsorAction",
                db_table: "survey_reward_directsponsoraction",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.TransferRequest",
                app_label: "survey_reward",
                model_name: "transferrequest",
                object_name: "TransferRequest",
                db_table: "survey_reward_transferrequest",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.ApprovedTransferRequest",
                app_label: "survey_reward",
                model_name: "approvedtransferrequest",
                object_name: "ApprovedTransferRequest",
                db_table: "survey_reward_transferrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.PendingTransferRequest",
                app_label: "survey_reward",
                model_name: "pendingtransferrequest",
                object_name: "PendingTransferRequest",
                db_table: "survey_reward_transferrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.RejectedTransferRequest",
                app_label: "survey_reward",
                model_name: "rejectedtransferrequest",
                object_name: "RejectedTransferRequest",
                db_table: "survey_reward_transferrequest",
                installed: true,
                abstract: false,
                proxy: true,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "survey_reward.TransferAction",
                app_label: "survey_reward",
                model_name: "transferaction",
                object_name: "TransferAction",
                db_table: "survey_reward_transferaction",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "uuid",
                    verbose_name: "uuid"
                }
            }
        },
        {
            _meta: {
                label: "silk.Request",
                app_label: "silk",
                model_name: "request",
                object_name: "Request",
                db_table: "silk_request",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "id"
                }
            }
        },
        {
            _meta: {
                label: "silk.Response",
                app_label: "silk",
                model_name: "response",
                object_name: "Response",
                db_table: "silk_response",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "id"
                }
            }
        },
        {
            _meta: {
                label: "silk.SQLQuery",
                app_label: "silk",
                model_name: "sqlquery",
                object_name: "SQLQuery",
                db_table: "silk_sqlquery",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "silk.Profile_queries",
                app_label: "silk",
                model_name: "profile_queries",
                object_name: "Profile_queries",
                db_table: "silk_profile_queries",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: "<class 'silk.models.Profile'>",
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        },
        {
            _meta: {
                label: "silk.Profile",
                app_label: "silk",
                model_name: "profile",
                object_name: "Profile",
                db_table: "silk_profile",
                installed: true,
                abstract: false,
                proxy: false,
                auto_created: false,
                pk: {
                    column: "id",
                    verbose_name: "ID"
                }
            }
        }
    ]
}